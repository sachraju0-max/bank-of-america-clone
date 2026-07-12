$(document).ready(function(){
	
	var $tocDotIndex = 0; 
   var $tocListItem = "";
  
   $('.service-agreement-module .com-skin ol.cat-list li > a').each(function () {
  		if($(this).html().indexOf(". ") != -1) {
      	if($(this).children("span.ada-hidden").length > 0) {
         	$tocListItem=$(this).clone().children(":first").remove().end().text();
            $tocDotIndex = ($tocListItem.indexOf(". ")-2);
            $tocListItem = $tocListItem.replace($tocListItem.substring($tocDotIndex,($tocDotIndex+4)),'');
			$tocListItem=$tocListItem.replace('TM','<sup>TM</sup>');
            $(this).html('<span class="ada-hidden">'+$(this).children(":first").text()+"</span>"+$.trim($tocListItem));
			if($(this).siblings('.section-intro').length > 0) {
				$(this).siblings('.section-intro').children(":first").prepend('<span class="ada-hidden">'+$.trim($tocListItem)+' </span>');	
			}                                                          
         } else {
            $tocListItem=$(this).text();
            $tocDotIndex = ($(this).text().indexOf(". ")-2);
            $(this).text($.trim($(this).text().replace($(this).text().substring($tocDotIndex,($tocDotIndex+3)),'')));
			$(this).text($(this).text().replace('TM','<sup>TM</sup>'));
			if($(this).siblings('.section-intro').length > 0) {
				$(this).siblings('.section-intro').children(":first").prepend('<span class="ada-hidden">'+$(this).text()+' </span>');	
			}
         }                                              
      }
   }); 

	var $serviceAgreementModuleComSkin = $(".service-agreement-module .com-skin");
	var $serviceAgreementModuleComECDSkin = $(".service-agreement-module .com-skin.com-ecd-skin");
	
	if ( ($serviceAgreementModuleComSkin.length > 0) && ($serviceAgreementModuleComECDSkin.length == 0) ) {

		var $serviceAgreementTopicToggle = $(".service-agreement-module .com-skin .topic-toggle");
		var $serviceAgreementCategoryLink = $(".service-agreement-module .com-skin .category-link");
		var $serviceAgreementCategoryLinkADAText = $(".service-agreement-module .com-skin .category-link .ada-hidden");
		var $serviceAgreementTopicList = $(".service-agreement-module .com-skin .cat-list ol");
		var $serviceAgreementSectionIntro = $(".service-agreement-module .com-skin .cat-list .section-intro");
		
		$serviceAgreementCategoryLinkADAText.text(ADAShowTopicsText);
		
		$serviceAgreementTopicToggle.click(function() {
										    
  			$serviceAgreementTopicToggle.toggleClass("hide");	
			
			if($('#show-topics').hasClass('hide'))
			{
				$serviceAgreementTopicList.show();
				$serviceAgreementSectionIntro.show();
				$serviceAgreementCategoryLinkADAText.text(ADAHideTopicsText);
			}
			else
			{
				$serviceAgreementTopicList.hide();
				$serviceAgreementSectionIntro.hide();
				$serviceAgreementCategoryLinkADAText.text(ADAShowTopicsText);
			}			
		});
		
		$serviceAgreementCategoryLink.click(function() {
											
			if( $(this).children(".ada-hidden").text() == ADAShowTopicsText)
			{
				$(this).children(".ada-hidden").text(ADAHideTopicsText);
			}
			else
			{
				$(this).children(".ada-hidden").text(ADAShowTopicsText);
			}
			$(this).siblings().toggle();
		});
	}	
	// hiding the link for ASA pages
	$(".olb-2col-standard-layout .service-agreement-module .com-skin .intro-link").addClass("hide");
	
});