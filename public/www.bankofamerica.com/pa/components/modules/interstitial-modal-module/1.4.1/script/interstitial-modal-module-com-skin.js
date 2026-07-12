	var $cacheInterstitialModalButton_init = null; // Moved to Global to help with double modal processing. 
	
$(document).ready(function(){
    if ($('.com-interstitial-modal').length == 0){
        return false;
    }

	$('.com-interstitial-modal').each(function(i) {
        $(this).attr('id', 'com-interstitial-modal-' + i);
    });

	
	var triggerInterstitialFn=function($this){
	    var el = $this, classes = el.attr('class');
        var m = classes.match(/ boa-index-(\d+)/);
        var index = m && m[1] ? m[1] : 0;

		var options = {
			skin: 'modal-flex',
			width: 740
		};
		
		// Close all other Modals in background that are open before opening Int Modal.
		$('.ui-dialog:visible').find(".ui-dialog-titlebar-close").click();

        var modal = $('#com-interstitial-modal-'+index);
		modal.boaFlexModal(options);
		
		var interstitialTo = $this.attr('rel'),
		    targetWindow = $this.attr('data-window');
		    
		modal.find('.button-blue, .iml-continue').attr('href',interstitialTo);
		

        if (typeof targetWindow != "undefined" && targetWindow != null) {
            if (!targetWindow.match("^_")) {
                targetWindow = "_" + targetWindow;
            }
            modal.find('.button-blue, .iml-continue').attr('target', targetWindow);
        }

		
		
		modal.find('.close-com-interstitial').click(function(){		    
            setTimeout(function() {
                modal.find('.button-blue, .iml-continue').removeAttr('target');
            }, 1);							   
			modal.closest('.modal-flex').find(".ui-dialog-titlebar-close").click();
		});

	};	
	
	if(typeof jQuery!="undefined"&&/[1-9]\.[7-9].[1-9]/.test($.fn.jquery)){
		$(document).on("click","a.com-interstitial-modal-link", function(){
			$cacheInterstitialModalButton_init = $(this);
			triggerInterstitialFn($(this));
		}); 
	}else{
		$("a.com-interstitial-modal-link").click(function(){
			$cacheInterstitialModalButton_init = $(this);
			triggerInterstitialFn($(this));
		}); 
	}	
	 
});
