/**
 * Writes app/icon.svg, app/favicon.ico (16/32/48) and app/apple-icon.png (180)
 * from one design. Run `npm run icons` after editing.
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const APP_DIR = path.join(import.meta.dirname, "..", "app");

const NAVY = "#0A2A5E"; // --bar-bg
const AMBER = "#F0B429"; // --bar-active
const WHITE = "#FFFFFF";

/** The mark on a 32-unit canvas: amber origin, destination ring, route between. */
const MARK = `
  <circle cx="11" cy="11" r="4.4" fill="${AMBER}"/>
  <path d="M11 16.6c0 4.4 2.1 5.6 6.2 5.6" stroke="${WHITE}" stroke-width="2.6"
    stroke-linecap="round" fill="none"/>
  <circle cx="21.6" cy="21.6" r="3.5" stroke="${WHITE}" stroke-width="2.6" fill="none"/>`;

/** `rounded` for browser tabs; a full square for iOS, which applies its own mask. */
const iconSvg = ({ rounded }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="${rounded ? 7 : 0}" fill="${NAVY}"/>${MARK}
</svg>
`;

const toPng = (svg, size) =>
  sharp(Buffer.from(svg), { density: 72 * (size / 32) * 4 })
    .resize(size, size)
    .png()
    .toBuffer();

/** An ICO file holding PNG images (supported by every browser since IE Vista era). */
function toIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = header.length + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 means 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette colours
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map(({ data }) => data)]);
}

const tabIcon = iconSvg({ rounded: true });
const icoSizes = [16, 32, 48];

await writeFile(path.join(APP_DIR, "icon.svg"), tabIcon);
await writeFile(
  path.join(APP_DIR, "favicon.ico"),
  toIco(
    await Promise.all(
      icoSizes.map(async (size) => ({ size, data: await toPng(tabIcon, size) })),
    ),
  ),
);
await writeFile(
  path.join(APP_DIR, "apple-icon.png"),
  await toPng(iconSvg({ rounded: false }), 180),
);

console.log("Wrote app/icon.svg, app/favicon.ico, app/apple-icon.png");
