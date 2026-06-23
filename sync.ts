import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import matter from "gray-matter";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const bucketIndex = args.indexOf("--bucket");
const stripFrontmatter = args.includes("--strip-frontmatter");

if (!dryRun && (bucketIndex === -1 || !args[bucketIndex + 1])) {
  console.error(
    "Usage: tsx sync.ts --bucket <bucket-name> [--strip-frontmatter]",
  );
  console.error("       tsx sync.ts --dry-run [--strip-frontmatter]");
  process.exit(1);
}

const bucket = !dryRun ? args[bucketIndex + 1] : null;
const repoRoot = process.cwd();
const dryRunDir = join(repoRoot, "dry-run");
const excludedDirs = ["dry-run", "node_modules"];

const s3 = !dryRun
  ? new S3Client({ region: process.env.AWS_REGION ?? "us-east-1" })
  : null;

async function upload(
  key: string,
  body: string,
  contentType: string,
): Promise<void> {
  if (dryRun) {
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

interface MdbLearnLink {
  course?: string;
  lesson?: string;
}

interface Frontmatter {
  "mdb-learn-link"?: MdbLearnLink;
  [key: string]: unknown;
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

const manifest: Record<string, string> = {};

const baseFolders = (await readdir(repoRoot, { withFileTypes: true }))
  .filter(
    (e) =>
      e.isDirectory() &&
      !e.name.startsWith(".") &&
      !excludedDirs.includes(e.name),
  )
  .map((e) => e.name);

console.log(
  dryRun ? `Dry run — writing to ${dryRunDir}` : `Syncing to s3://${bucket}`,
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
      manifest[relPath] = learnLink;
    }

    await upload(
      relPath,
      stripFrontmatter ? content.trimStart() : raw,
      "text/markdown; charset=utf-8",
    );
  }
}

await upload(
  "manifest.json",
  JSON.stringify(manifest, null, 2),
  "application/json",
);

console.log(
  `\n${dryRun ? "Wrote" : "Uploaded"} manifest.json with ${Object.keys(manifest).length} entries`,
);
