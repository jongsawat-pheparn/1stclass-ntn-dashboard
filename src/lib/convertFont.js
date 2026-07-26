const fs = require('fs');
const path = require('path');

const fontPath = path.join(__dirname, 'public', 'fonts', 'IBMPlexSansThai-Regular.ttf');
if (!fs.existsSync(fontPath)) {
  console.error('❌ ไม่พบไฟล์ฟอนต์ที่ ' + fontPath);
  process.exit(1);
}

const fontBuffer = fs.readFileSync(fontPath);
const base64 = fontBuffer.toString('base64');
const outputPath = path.join(__dirname, 'fontBase64.txt');
fs.writeFileSync(outputPath, base64);
console.log('✅ แปลง Base64 เสร็จแล้ว! ไฟล์ fontBase64.txt ถูกสร้างใน root folder');