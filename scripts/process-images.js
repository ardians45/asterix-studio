const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '..', 'char');
const outputDir = path.join(__dirname, '..', 'public', 'sequence');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImages() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));
  console.log(`Found ${files.length} images to process.`);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputFileName = file.replace(/\.jpe?g$/i, '.webp');
    const outputPath = path.join(outputDir, outputFileName);

    await sharp(inputPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 65, effort: 6 })
      .toFile(outputPath);
  }
  
  console.log(`Finished processing ${files.length} images.`);
}

processImages().catch(console.error);
