import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { extname, join } from "node:path";

const outputDirectory = "public";
const staticFiles = [
  "index.html",
  "script.js",
  "style.css",
  "tailwind.generated.css",
];
const allowedAssetExtensions = new Set([".avif", ".webp"]);

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(join(outputDirectory, "assets"), { recursive: true });

await Promise.all(
  staticFiles.map((file) => cp(file, join(outputDirectory, file))),
);

const assets = await readdir("assets", { withFileTypes: true });
await Promise.all(
  assets
    .filter(
      (asset) =>
        asset.isFile() && allowedAssetExtensions.has(extname(asset.name)),
    )
    .map((asset) =>
      cp(join("assets", asset.name), join(outputDirectory, "assets", asset.name)),
    ),
);

console.log(`Static deployment prepared in ${outputDirectory}/`);
