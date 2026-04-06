const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public'); // Adjust path as needed

async function convertRecursively(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await convertRecursively(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const webpPath = filePath.replace(ext, '.webp');
        if (!fs.existsSync(webpPath)) {
            console.log(`Converting: ${filePath} -> ${webpPath}`);
            try {
                await sharp(filePath)
                .webp({ quality: 80 })
                .toFile(webpPath);
            } catch (error) {
                console.error(`Failed to convert ${filePath}:`, error);
            }
        } else {
            console.log(`Skipping (already exists): ${webpPath}`);
        }
      }
    }
  }
}

console.log('Starting conversion...');
convertRecursively(publicDir).then(() => {
    console.log('Conversion complete!');
});
