const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let modified = false;
      
      // Fix broken logo SVG references
      const regex = /src="[^"]*bac-logo[^"]*\.svg"/g;
      if (regex.test(content)) {
        content = content.replace(regex, 'src="/content/images/ContextualSiteGraphics/Logos/en_US/logos/colored_flagscape-v2.png"');
        modified = true;
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated Logo in: ${fullPath}`);
      }
    }
  }
}

const publicDir = path.join(__dirname, 'public');
processDirectory(publicDir);
console.log('Finished updating logos in HTML files.');
