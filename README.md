# MongoDB University LLM-Friendly Curriculum

This repository is not intended for direct human consumption or as a primary learning resource. For a Human-friendly version of the content, please visit [MongoDB University](https://learn.mongodb.com).

Purpose
- Contains MongoDB University content transformed into an LLM-friendly format for programmatic use.
- Used to present course units, skill badges, and lessons in a structure optimized for automated processing and model ingestion.

Structure
- Each unit / skill-badge / course has its own folder containing the relevant lesson files (Markdown).
- Example layout:
  - unit-name/
    - l0-intro-to-...md
    - l1-...md

## Sync process

A script `sync.ts` syncs the content of this repository to an S3 bucket and generates a `manifest.json` at the bucket root. The manifest maps each [learn.mongodb.com](https://learn.mongodb.com) URL to its corresponding file path, sourced from the `mdb-learn-link` field in each file's frontmatter (using `lesson` if present, otherwise `course`).

The sync runs automatically via GitHub Actions on pushes to `main` (staging bucket) and `production` (production bucket). To run locally:

```sh
# dry run — writes output to dry-run/ instead of S3
npm run sync-dryrun

# sync to a specific bucket (defaults to stage bucket)
npm run sync -- --bucket <bucket-name>

# strip frontmatter from files before uploading
npm run sync -- --strip-frontmatter
```
