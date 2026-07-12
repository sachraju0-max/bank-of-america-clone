const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(appJsxPath, 'utf8');

// Replace standard links
content = content.replace(/href="\/homepage\/wealth-management\.go"/g, 'href="#"');
content = content.replace(/href="\/smallbusiness\/index\.html"/g, 'href="#"');
content = content.replace(/href="\/homepage\/business-institutions\.go"/g, 'href="#"');
content = content.replace(/href="\/security-center\/overview\/"/g, 'href="#"');
content = content.replace(/href="\/homepage\/about-us\.go"/g, 'href="#"');
content = content.replace(/href="\/es\/index\.html"/g, 'href="#"');
content = content.replace(/href="\/customer-service\/contact-us\/bank-of-america-contact-information\/"/g, 'href="#"');
content = content.replace(/href="\/help\/index\.html"/g, 'href="#"');
content = content.replace(/href="\/deposits\/checking\/checking-accounts\/index\.html"/g, 'href="#"');
content = content.replace(/href="\/deposits\/savings\/savings-accounts\/index\.html"/g, 'href="#"');
content = content.replace(/href="\/credit-cards\/index\.html"/g, 'href="#"');
content = content.replace(/href="\/mortgage\/home-mortgage\/index\.html"/g, 'href="#"');
content = content.replace(/href="\/auto-loans\/index\.html"/g, 'href="#"');
content = content.replace(/href="https:\/\/www\.ml\.com\/"/g, 'href="#"');
content = content.replace(/href="\/information\/personal\/index\.html"/g, 'href="#"');

// Fix Images
// 1. Logo
content = content.replace(
  /https:\/\/www\.bankofamerica\.com\/content\/images\/ContextualSiteGraphics\/Logos\/en_US\/logos\/colored_flagscape-v2\.png/g,
  '/content/images/ContextualSiteGraphics/Logos/en_US/logos/colored_flagscape-v2.png'
);

// 2. Cards (Use the available local card)
content = content.replace(
  /https:\/\/www1\.bac-assets\.com\/homepage\/spa-assets\/images\/assets-images-site-hp-assets-mastheads-consumer-cards-en-4-card-card_mh_cust_newcrd2_8478822_e\.png/g,
  '/content/images/ContextualSiteGraphics/CreditCardArt/en_US/Approved_PCM/8blm_trvsigcm_v_250x158.png'
);
content = content.replace(
  /https:\/\/www1\.bac-assets\.com\/homepage\/spa-assets\/images\/assets-images-site-hp-assets-mastheads-consumer-cards-en-4-card-card_mh_un_newcrd2_8478822_e\.png/g,
  '/content/images/ContextualSiteGraphics/CreditCardArt/en_US/Approved_PCM/8blm_trvsigcm_v_250x158.png'
);
content = content.replace(
  /https:\/\/www1\.bac-assets\.com\/homepage\/spa-assets\/images\/assets-images-site-hp-assets-mastheads-consumer-cards-en-4-card-5779014_Travel_3\.png/g,
  '/content/images/ContextualSiteGraphics/CreditCardArt/en_US/Approved_PCM/8blm_trvsigcm_v_250x158.png'
);
content = content.replace(
  /https:\/\/www1\.bac-assets\.com\/homepage\/spa-assets\/images\/assets-images-site-hp-assets-mastheads-consumer-cards-en-4-card-card_mh_bac_no_8694270_e\.png/g,
  '/content/images/ContextualSiteGraphics/CreditCardArt/en_US/Approved_PCM/8blm_trvsigcm_v_250x158.png'
);

// 3. Better Money Habits (BMH) Images (Map to what we copied into /images)
content = content.replace(
  /https:\/\/www1\.bac-assets\.com\/homepage\/spa-assets\/images\/assets-images-site-homepage-bmh-module-default-education-bac-edu-tile-319x363-desktop-1-q2-CSXb35d6c2d\.jpg/g,
  '/images/assets-images-site-homepage-bmh-module-default-education-bac-edu-tile-397x360-tablet-1-q2-new-CSX4ac217ce.jpg'
);
content = content.replace(
  /https:\/\/www1\.bac-assets\.com\/homepage\/spa-assets\/images\/assets-images-site-homepage-bmh-module-default-education-bac-edu-tile-319x363-desktop-1-new-CSX71f0a17b\.jpg/g,
  '/images/assets-images-site-homepage-bmh-module-default-education-bac-edu-tile-397x360-tablet-1-new-CSXf09a6c23.jpg'
);
content = content.replace(
  /https:\/\/www1\.bac-assets\.com\/homepage\/spa-assets\/images\/assets-images-site-homepage-bmh-module-default-education-bac-edu-tile-319x363-desktop-3-q2-CSX872fbcfc\.jpg/g,
  '/images/assets-images-site-homepage-bmh-module-default-education-bac-edu-tile-397x360-tablet-3-q2-CSX378d7c3d.jpg'
);
content = content.replace(
  /https:\/\/www1\.bac-assets\.com\/homepage\/spa-assets\/images\/assets-images-site-homepage-bmh-module-default-education-bac-edu-tile-319x363-desktop-4-new-CSX88717b40\.jpg/g,
  '/images/assets-images-site-homepage-bmh-module-default-education-bac-edu-tile-397x360-tablet-4-new-CSXb13ca8f4.jpg'
);

// 4. Security & Mobile
content = content.replace(
  /https:\/\/www1\.bac-assets\.com\/homepage\/spa-assets\/images\/assets-images-site-homepage-news-life-services-yni_sec_phone_4657392_e-CSX8c7d2691\.webp/g,
  '/images/assets-images-site-homepage-news-life-services-yni_sec_phone_4657392_e-CSX2a8c4a8a.png'
);
content = content.replace(
  /https:\/\/www1\.bac-assets\.com\/homepage\/spa-assets\/images\/assets-images-site-homepage-news-mobileAppIPhone-CSX16b160ab\.png/g,
  '/images/assets-images-site-homepage-news-mobileAppIPhone-CSX16b160ab.png'
);

fs.writeFileSync(appJsxPath, content, 'utf8');
console.log('Successfully updated App.jsx with local images and fixed links!');
