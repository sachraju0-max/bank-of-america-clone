(function ($) {
    var $toggleInputs = $(".atm-locator-bdf-module input.citystate-input,.atm-locator-module input#atm_zip, .sign-in-module-content input.search-text-box"),
      $this, value;

    $toggleInputs.each(function(){ //save original value or input into jQuery data
      $this = $(this);
      $this.data('orig', $this.val());
    });

    $toggleInputs.focus(function () { //on foucs, if it's not readonly and the value matches the original, empty the input
      $this = $(this);
        if ( $this.attr("readonly") != true && $this.val() === $this.data('orig') ) 
            $this.val("")
    });

    $toggleInputs.blur(function () { //on blur, if the input is empty, set the value to the title attribute or the original value
      $this = $(this),
      value = ($this.attr('title'))? $this.attr('title') : $this.data('orig');
        if ( $this.val() === "" || $this.val() === " " ) 
          $this.val(value);
    })
})(jQuery);
