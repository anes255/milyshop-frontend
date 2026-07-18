/* eslint-disable */
// Rasterizes the SVG logo into PNGs used for the favicon and the
// social link-preview (Open Graph) image. Run: node scripts/make-og.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const logoSvg = fs.readFileSync(path.join(root, "public", "logo.svg"));

async function main() {
  // Favicon / apple-touch PNG (transparent background)
  await sharp(logoSvg, { density: 384 })
    .resize(512, 512, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(root, "public", "logo.png"));

  // Open Graph card: 1200x630 blush background with the logo centered
  const W = 1200, H = 630, logoSize = 480;
  const logoPng = await sharp(logoSvg, { density: 384 })
    .resize(logoSize, logoSize, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  const wordmark = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
       <text x="${W / 2}" y="595" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="30" letter-spacing="8" fill="#a86682">BOUTIQUE MILYSHOP</text>
     </svg>`
  );

  await sharp({ create: { width: W, height: H, channels: 4, background: "#fdf5f4" } })
    .composite([
      { input: logoPng, top: 55, left: Math.round((W - logoSize) / 2) },
      { input: wordmark, top: 0, left: 0 },
    ])
    .png()
    .toFile(path.join(root, "public", "og.png"));

  console.log("Generated public/logo.png and public/og.png");
}

main().catch((e) => { console.error(e); process.exit(1); });
