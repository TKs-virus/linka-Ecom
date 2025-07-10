const fs = require('fs');
const path = require('path');
const axios = require('axios');

const fontDir = path.join(__dirname, 'public', 'fonts', 'inter', 'web');
const fonts = [
  { name: 'Inter-Regular.woff2', url: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2' },
  { name: 'Inter-Bold.woff2', url: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1pL7.woff2' },
];

async function downloadFont(font) {
  const filePath = path.join(fontDir, font.name);
  if (fs.existsSync(filePath)) {
    console.log(`${font.name} already exists. Skipping download.`);
    return;
  }
  try {
    const response = await axios.get(font.url, { responseType: 'arraybuffer' });
    fs.writeFileSync(filePath, response.data);
    console.log(`Downloaded ${font.name}`);
  } catch (error) {
    console.error(`Failed to download ${font.name}:`, error.message);
  }
}

async function main() {
  if (!fs.existsSync(fontDir)) {
    fs.mkdirSync(fontDir, { recursive: true });
  }
  for (const font of fonts) {
    await downloadFont(font);
  }
}

main();