const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Changed target directory to link-aja-kas
const projectDir = path.join(__dirname, '../public/projects/link-aja-kas');

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
            
            // Custom renaming for LinkAja
            let cleanName = path.basename(file, ext)
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]/g, '');
            
            // Specific overrides
            if (cleanName.includes('hifi-dashboard')) cleanName = 'dashboard-hifi';
            if (cleanName.includes('wireframe')) cleanName = 'dashboard-wireframe';
            if (cleanName.includes('thumb')) cleanName = 'thumbnail';
            
            const newPath = path.join(projectDir, `${cleanName}.webp`);
            
            console.log(`Converting: ${file} -> ${cleanName}.webp`);
            
            try {
                await sharp(oldPath)
                    .webp({ quality: 80 })
                    .toFile(newPath);
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        }
    }
})();
