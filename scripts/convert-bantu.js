const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Changed target directory to cactastic
const projectDir = path.join(__dirname, '../public/projects/cactastic');

if (!fs.existsSync(projectDir)) {
    console.error(`Directory not found: ${projectDir}`);
    process.exit(1);
}

const files = fs.readdirSync(projectDir);

(async () => {
    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
            const oldPath = path.join(projectDir, file);
            
            // Clean filename: lowercase, replace spaces with hyphens, remove special chars
            const cleanName = path.basename(file, ext)
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]/g, '');
            
            const newPath = path.join(projectDir, `${cleanName}.webp`);
            
            console.log(`Converting: ${file} -> ${cleanName}.webp`);
            
            try {
                await sharp(oldPath)
                    .webp({ quality: 80 })
                    .toFile(newPath);
                
                // Optional: Delete original
                // fs.unlinkSync(oldPath); 
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        }
    }
})();
