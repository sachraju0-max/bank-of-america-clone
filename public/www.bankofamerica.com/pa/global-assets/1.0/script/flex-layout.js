/*Function to dock footer at bottom of layout */
function setFlexLayoutFooterHeight() {

	var windowHeight = $(window).height();

	if(windowHeight > flexLayoutCenterContentHeightOriginal){
	
		var heightFooter = windowHeight - flexLayoutCenterContentHeightOriginal;
		$flexLayoutFooterInner.css('margin-top',heightFooter);
	
	} 
	
	/*for dev only
	$('.windowHeight').html(windowHeight);
	$('.heightFooter').html(heightFooter);
	$('.flexLayoutFooterHeightOriginalHeight').html(flexLayoutFooterHeightOriginal);
	$('.flexLayoutCenterContentHeightOriginalHeight').html(flexLayoutCenterContentHeightOriginal);
	*/
}
/*Define JS vars used to calculate layout height*/
var flexLayoutFooterHeightOriginal; 				   
var flexLayoutCenterContentHeightOriginal; 
var $flexLayoutFooterDiv;
var $flexLayoutFooterInner;

$(document).ready(function(){

	if(( $('body > .two-row-flex-wideleft-layout, body > .two-row-flex-wideright-layout, body > .flex-layout, body > .fsd-layout, body > .vipaa-passcode-layout').length > 0)) {
		
		var $footerInnerfootnoteComModuleFsdLayoutSkin = $(".fsd-layout .footer-inner .footnote-com-module .fsd-layout-skin");
		var $footerInnerfootnoteModuleFsdLayoutSkin = $(".fsd-layout .footer-inner .footnote-module .fsd-layout-skin");
		var $footerInnerDisclaimersPresent = $(".fsd-layout .footer-inner .disclaimers-module .fsd-skin");
		
		if ( $footerInnerfootnoteComModuleFsdLayoutSkin.length > 0 ) {			
			if ( $footerInnerDisclaimersPresent.length > 0 ) {
				$footerInnerfootnoteComModuleFsdLayoutSkin.addClass('footnote-disclaimer-adjust');
			}
		}				
		if ( $footerInnerfootnoteModuleFsdLayoutSkin.length > 0 ) {
			if ( $footerInnerDisclaimersPresent.length > 0 ) {
				$footerInnerfootnoteModuleFsdLayoutSkin.addClass('footnote-disclaimer-adjust');
			}
		}
		
		$flexBottomRow = $('.two-row-flex-wideleft-layout .bottom-row');
		if ( $flexBottomRow.length > 0) {
			$($flexBottomRow).each( function(i) {
				if ($.trim($(this).text()).length===0) {
					$(this).remove();
				} 
			});
		}
		

		flexLayoutFooterHeightOriginal = $('div.footer-inner').height();					   
		flexLayoutCenterContentHeightOriginal = $('div.center-content').height();
		$flexLayoutFooterDiv = $('div.footer');
		$flexLayoutFooterInner = $('div.footer-inner',$flexLayoutFooterDiv);

		setFlexLayoutFooterHeight();
		
		$(window).resize(function() {
			setFlexLayoutFooterHeight();
		});

	}
		
});



