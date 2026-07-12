const fs = require('fs');
const html = fs.readFileSync('Bank of America - Banking, Credit Cards, Loans and Merrill Investing.html', 'utf8');
const urls = html.match(/https?:\/\/[^\s"'<>{}|\\^`]+?\.png/ig) || [];
console.log(Array.from(new Set(urls)).filter(u => u.includes('card')).join('\n'));
