var notprodIndicators = [
    'www-',
    'secure-',
    '-dev',
    '-stg',
    'dev-',
    '-sit',
    '-uat',
    '-pt',
    '-pssit',
    'review-',
    'localhost',
    'preview-',
    '-preview',
    '-helix',
    'sit1',
    'sit2',
    'billpay-bit',
    'qaceft',
    'app-nbob1',
    'myfinancialpicturestagepfm'
  ];
  function notprodIndicatorFilter(){
    var isNotProd = false;
    for (var i=0; i<notprodIndicators.length; i++){
      if (window.location.hostname.includes(notprodIndicators[i])) {
        isNotProd = true
        break
      }
    }
    return isNotProd ? 'notprod' : 'prod';
  };
  var env = notprodIndicatorFilter()
  var script = document.createElement('script');
  var tealiumScript = 'https://tags.tiqcdn.com/utag/bofa/main/' + env + '/' + 'utag.sync.js';
  script.src = tealiumScript;
  script.type = 'text/javascript';
  document.head.appendChild(script);