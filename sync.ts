import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import matter from "gray-matter";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";

// Probably want to ensure this is in sync with .gitignore
const SYNC_EXCLUDED_DIRS = ["dry-run", "node_modules"];
const DEFAULT_BUCKET = "university-renderlearn-llm-content-stage";

interface MdbLearnLink {
  course?: string;
  lesson?: string;
}

interface Frontmatter {
  "mdb-learn-link"?: MdbLearnLink;
  [key: string]: unknown;
}

async function commit(
  s3: S3Client | null,
  key: string,
  body: string,
  bucket: string | null,
  contentType: string,
  dryRunDir: string | null,
): Promise<void> {
  if (dryRunDir !== null) {
    const outPath = join(dryRunDir, key);
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, body, "utf-8");
    console.log(`  Written: ${outPath}`);
  } else {
    await s3!.send(
      new PutObjectCommand({
        Bucket: bucket!,
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );
    console.log(`  Uploaded: ${key}`);
  }
}

async function deleteStaleS3Objects(
  s3: S3Client,
  bucket: string,
  uploadedKeys: Set<string>,
): Promise<void> {
  const toDelete: { Key: string }[] = [];
  let continuationToken: string | undefined;

  do {
    const response = await s3.send(
      new ListObjectsV2Command({ Bucket: bucket, ContinuationToken: continuationToken }),
    );
    for (const obj of response.Contents ?? []) {
      if (obj.Key && !uploadedKeys.has(obj.Key)) {
        toDelete.push({ Key: obj.Key });
      }
    }
    continuationToken = response.NextContinuationToken;
  } while (continuationToken);

  if (toDelete.length === 0) return;

  // DeleteObjects supports up to 1000 keys per request
  for (let i = 0; i < toDelete.length; i += 1000) {
    await s3.send(
      new DeleteObjectsCommand({
        Bucket: bucket,
        Delete: { Objects: toDelete.slice(i, i + 1000) },
      }),
    );
  }
  for (const { Key } of toDelete) {
    console.log(`  Deleted: ${Key}`);
  }
}

async function* walkMd(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkMd(full);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      yield full;
    }
  }
}

const main = async () => {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const bucketIndex = args.indexOf("--bucket");
  const stripFrontmatter = args.includes("--strip-frontmatter");

  const bucket = dryRun ? null : (bucketIndex !== -1 ? args[bucketIndex + 1] : undefined) ?? DEFAULT_BUCKET;
  const repoRoot = process.cwd();
  const dryRunDir: string | null = dryRun ? join(repoRoot, "dry-run") : null;
  const s3 = !dryRun
    ? new S3Client({ region: process.env.AWS_REGION ?? "us-east-1" })
    : null;

  if (dryRun) {
    await rm(dryRunDir, { recursive: true, force: true });
  }

  const manifest: Record<string, string> = {};
  const uploadedKeys = new Set<string>();
  const failures: string[] = [];

  const baseFolders = (await readdir(repoRoot, { withFileTypes: true }))
    .filter(
      (e) =>
        e.isDirectory() &&
        !e.name.startsWith(".") &&
        !SYNC_EXCLUDED_DIRS.includes(e.name),
    )
    .map((e) => e.name);

  console.log(
    dryRun ? `Dry run -- writing to ${dryRunDir}` : `Syncing to s3://${bucket}`,
  );
  console.log(`Base folders: ${baseFolders.join(", ")}`);
  if (stripFrontmatter) console.log("Stripping frontmatter from files");

  for (const folder of baseFolders) {
    for await (const filePath of walkMd(join(repoRoot, folder))) {
      const relPath = relative(repoRoot, filePath);
      const raw = await readFile(filePath, "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = data as Frontmatter;

      const link = frontmatter["mdb-learn-link"];
      const learnLink = link?.lesson ?? link?.course;
      if (learnLink) {
        manifest[learnLink] = relPath;
      } else {
        console.warn(
          `  Warning: ${relPath} could not be added to the manifest — missing or invalid mdb-learn-link. Ensure mdb-learn-link exists in the frontmatter, and it includes a 'course' and/or 'lesson' field.`,
        );
      }

      uploadedKeys.add(relPath);
      try {
        await commit(
          s3,
          relPath,
          stripFrontmatter ? content.trimStart() : raw,
          bucket,
          "text/markdown; charset=utf-8",
          dryRunDir,
        );
      } catch (err) {
        failures.push(relPath);
        console.error(`  Error uploading ${relPath}: ${err instanceof Error ? err.message : err}`);
      }
    }
  }

  uploadedKeys.add("manifest.json");
  try {
    await commit(
      s3,
      "manifest.json",
      JSON.stringify(manifest, null, 2),
      bucket,
      "application/json",
      dryRunDir,
    );
    console.log(
      `\n${dryRun ? "Wrote" : "Uploaded"} manifest.json with ${Object.keys(manifest).length} entries`,
    );
  } catch (err) {
    failures.push("manifest.json");
    console.error(`  Error uploading manifest.json: ${err instanceof Error ? err.message : err}`);
  }

  if (!dryRun) {
    try {
      await deleteStaleS3Objects(s3!, bucket!, uploadedKeys);
    } catch (err) {
      console.error(`  Error during S3 cleanup: ${err instanceof Error ? err.message : err}`);
      failures.push("(S3 cleanup)");
    }
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} operation(s) failed:\n${failures.map((f) => `  - ${f}`).join("\n")}`);
    process.exit(1);
  }
};

main();
