const fs = require('fs');
const html = fs.readFileSync('Bank of America - Banking, Credit Cards, Loans and Merrill Investing.html', 'utf8');
const urls = html.match(/https?:\/\/[a-zA-Z0-9.\/-_]+\.(?:png|jpg|jpeg|svg|webp)/ig) || [];
console.log(Array.from(new Set(urls)).join('\n'));
