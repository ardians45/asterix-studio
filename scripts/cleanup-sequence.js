const fs = require('fs');
const path = require('path');

const sequenceDir = path.join(__dirname, '../public/sequence');

if (!fs.existsSync(sequenceDir)) {
    console.error('Sequence directory not found!');
    process.exit(1);
}

const files = fs.readdirSync(sequenceDir);
let deletedCount = 0;

files.forEach(file => {
    const filePath = path.join(sequenceDir, file);
    const ext = path.extname(file).toLowerCase();

    // 1. Delete PNG and JPG files
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        fs.unlinkSync(filePath);
        console.log(`Deleted (ext): ${file}`);
        deletedCount++;
    } 
    // 2. Delete WebP files > 100 (e.g. ezgif-frame-101.webp)
    else if (ext === '.webp') {
        const match = file.match(/ezgif-frame-(\d+)\.webp/);
        if (match) {
            const frameNum = parseInt(match[1]);
            if (frameNum > 80) {
                fs.unlinkSync(filePath);
                console.log(`Deleted (frame > 100): ${file}`);
                deletedCount++;
            }
        }
    }
});

console.log(`Cleanup complete. Deleted ${deletedCount} files.`);
