const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const input = path.join(__dirname, '../public/profile.jfif');
const output = path.join(__dirname, '../public/profile.webp');

sharp(input)
  .webp({ quality: 80 })
  .toFile(output)
  .then(() => {
    console.log('Profile converted to WebP');
    // Optional: remove original if user implied "replace" (ubah menjadi usually implies replacement or switching usage)
    // I won't delete it automatically unless explicitly confirming, but standard practice is often to keep or delete. 
    // User said "hapus fiel png/jpg" for sequence, but for this "ubah menjadi". I will keep it for safety but usage will be webp.
  })
  .catch(err => console.error(err));
