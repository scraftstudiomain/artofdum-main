import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = './src/RAW IMAGES AGGREGATOR SHOOT';

if (!fs.existsSync(dir)) {
  console.error(`Directory ${dir} does not exist!`);
  process.exit(1);
}

const files = fs.readdirSync(dir);
console.log(`Found ${files.length} files in ${dir}. Starting compression...`);

let processed = 0;

for (const file of files) {
  if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png')) {
    const filePath = path.join(dir, file);
    const tempPath = path.join(dir, 'temp_' + file);
    
    try {
      const stats = fs.statSync(filePath);
      const originalSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`Compressing ${file} (${originalSizeMB} MB)...`);
      
      // Wait for sharp to process the image
      await sharp(filePath)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 80, progressive: true })
        .toFile(tempPath);
        
      fs.renameSync(tempPath, filePath);
      
      const newStats = fs.statSync(filePath);
      const newSizeKB = (newStats.size / 1024).toFixed(2);
      console.log(`Finished ${file}! New size: ${newSizeKB} KB.`);
      processed++;
    } catch (err) {
      console.error(`Error compressing ${file}:`, err);
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    }
  }
}

console.log(`Successfully compressed ${processed} images.`);
