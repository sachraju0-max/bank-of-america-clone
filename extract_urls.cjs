const fs = require('fs');
const html = fs.readFileSync('Bank of America - Banking, Credit Cards, Loans and Merrill Investing.html', 'utf8');
const urls = html.match(/https?:\/\/[^\s"'\\>]+/ig) || [];
const imageUrls = urls.filter(u => u.match(/\.(png|jpg|jpeg|svg|webp)$/i));
console.log(Array.from(new Set(imageUrls)).join('\n'));
