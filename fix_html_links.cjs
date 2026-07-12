const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.html') || fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let modified = false;
      
      // Replace absolute BofA URLs with local paths
      if (content.includes('https://www1.bac-assets.com/')) {
        content = content.replace(/https:\/\/www1\.bac-assets\.com\//g, '/www1.bac-assets.com/');
        modified = true;
      }
      if (content.includes('https://www.bankofamerica.com/')) {
        content = content.replace(/https:\/\/www\.bankofamerica\.com\//g, '/www.bankofamerica.com/');
        modified = true;
      }
      if (content.includes('https://www2.bac-assets.com/')) {
        content = content.replace(/https:\/\/www2\.bac-assets\.com\//g, '/www2.bac-assets.com/');
        modified = true;
      }
      // Also fix http variants just in case
      if (content.includes('http://www1.bac-assets.com/')) {
        content = content.replace(/http:\/\/www1\.bac-assets\.com\//g, '/www1.bac-assets.com/');
        modified = true;
      }
      if (content.includes('http://www.bankofamerica.com/')) {
        content = content.replace(/http:\/\/www\.bankofamerica\.com\//g, '/www.bankofamerica.com/');
        modified = true;
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

const publicDir = path.join(__dirname, 'public');
processDirectory(publicDir);
console.log('Finished updating all HTML files in public directory.');
