$(document).ready(function(){
    // CPRA pill image changes : Nov release 2023
    displayCPRAPillImageByOptanon();
    // Advertising Practices - OOB interstitial modal
    advPracticesModal();

});

// Framing Patent URL
document.addEventListener('DOMContentLoaded', function() {
    var currentURL = document.location.href;
    var env = currentURL.split('-')[1];
    var patentURL = "";
    if (currentURL.includes('helix')) {
        patentURL = "https://www-" + env + "-helix.ecnp.bankofamerica.com/company/patents/";
    } else {
        patentURL = "https://patents.bankofamerica.com/";
    }
    var patentEl = document.querySelector(".patent-ftr");
    if (null !== patentEl) {
        patentEl.setAttribute('href', patentURL);
    }
});

function displayCPRAPillImageByOptanon() {
    var utagCheck = setInterval(function () {
        if(typeof Optanon != 'undefined') {
            document.getElementById('pillImage').style.display = 'inline-block';
            clearInterval(utagCheck);
        }
    }, 1000);

    setTimeout(function () {
        clearInterval(utagCheck);
    }, 60000);

}

function advPracticesModal() {
    var $adv_cacheInterstitialModalButton_init = null;
    if ($(".adv-practices-interstitial-modal").length == 0) {
        return false
    }
    $(".adv-practices-interstitial-modal").each(function(i) {
        $(this).attr("id", "adv-practices-interstitial-modal-" + i)
    });
    var advpracticesTriggerInterstitialFn = function($this) {
        var el = $this
        , classes = el.attr("class");
        var m = classes.match(/ boa-index-(\d+)/);
        var index = m && m[1] ? m[1] : 0;
        var options = {
            skin: "modal-flex",
            width: 740
        };
        $(".ui-dialog:visible").find(".ui-dialog-titlebar-close").click();
        var modal = $("#adv-practices-interstitial-modal-" + index);
        modal.boaFlexModal(options);
        var interstitialTo = $this.attr("rel")
        , targetWindow = $this.attr("data-window");
        modal.find(".button-blue, .iml-continue").attr("href", interstitialTo);
        if (typeof targetWindow != "undefined" && targetWindow != null) {
            if (!targetWindow.match("^_")) {
                targetWindow = "_" + targetWindow
            }
            modal.find(".button-blue, .iml-continue").attr("target", targetWindow)
        }
        modal.find(".close-adv-practices-interstitial").click(function() {
            setTimeout(function() {
                modal.find(".button-blue, .iml-continue").removeAttr("target")
            }, 1);
            modal.closest(".modal-flex").find(".ui-dialog-titlebar-close").click()
        })
    };
    if (typeof jQuery != "undefined" && /[1-9]\.[7-9].[1-9]/.test($.fn.jquery)) {
        $(document).on("click", "a.adv-practices-interstitial-modal-link", function() {
            $adv_cacheInterstitialModalButton_init = $(this);
            advpracticesTriggerInterstitialFn($(this))
        })
    } else {
        $("a.adv-practices-interstitial-modal-link").click(function() {
            $adv_cacheInterstitialModalButton_init = $(this);
            advpracticesTriggerInterstitialFn($(this))
        })
    }
}