// Resizes and compresses photos for the website.
//
// 1. Put the original photos in /photos-raw, named after the slots in
//    README.md (e.g. hero.jpg, gallery-01.jpg). PNG, JPG, WEBP all fine (not HEIC).
// 2. Run:  npm run images
// 3. Optimised copies are written to /public/images as name.jpg (2000px wide)
//    and name-900.jpg (900px wide, used on phones).
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const src = path.resolve("photos-raw");
const out = path.resolve("public/images");
fs.mkdirSync(out, { recursive: true });

const files = fs.readdirSync(src).filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f));
if (!files.length) {
  console.log("No photos found in /photos-raw.");
  process.exit(0);
}

for (const file of files) {
  const name = path.parse(file).name.toLowerCase();
  const input = sharp(path.join(src, file)).rotate(); // respect phone orientation
  await input.clone().resize({ width: 2000, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(out, `${name}.jpg`));
  await input.clone().resize({ width: 900, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(out, `${name}-900.jpg`));
  console.log(`✓ ${name}.jpg`);
}
console.log(`\nDone — ${files.length} photo(s). Run "npm run build" to rebuild the site.`);
