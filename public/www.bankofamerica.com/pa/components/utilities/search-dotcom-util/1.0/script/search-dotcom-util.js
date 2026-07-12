/* Set up the default/shared container for labels
 */
boa = boa || {};
boa.search = boa.search || {};
boa.search.i18n = boa.search.i18n || {};

var navSearch = function() {

  /*Define module defaults*/
  var defaults = {
      "target": ".nav-search",
      $target: $(),
      "toggle": ".nav-search-toggle",
      $toggle: $(),
      container: ".header-search"
    },

    /*Define required data attributes*/
    required = {
      "data": {
        "component": "module",
        "module": "header",
        "skin": "nav-search"
      }
    },

    /*settings holds final module data*/
    settings = {},

    _wireNLH = function() {
      var $nlh = settings.$target,
        $input = $( 'input[type="text"]', $nlh ),
        $button = $( 'input[type="submit"]', $nlh ),
        $a = $( 'a.icon', $nlh ),
        $form = $input.parents( "form" ),
        $placeholder = $(),

        getLabels = function() {
          boa.search.i18n.labels
        },

        shimPlaceholder = function( $input ) {
          /* Adapted from search-build-util/1.0/src/lib/placeholder.js 
           */
          var options = {
              force: false,
              input: "",
              element: "span",
              elementClass: "placeholder",
              hideClass: "hide",
              shimmedClass: "shimmed-placeholder"

            },
            hasNativeSupport = function() {
              return "placeholder" in $( "<input/>" )[ 0 ];
            };

          if ( $input.length === 0 || hasNativeSupport() ) {
            return $();
          }

          var $placeholder = $( "<" + options.element + "/>" )
            .addClass( options.elementClass )
            .text( $input.attr( options.elementClass ) )
            .insertBefore( $input.removeAttr( options.elementClass ) );

          $input.addClass( options.shimmedClass )
            .bind( 'keyup.dotcom', function( e ) {
              if ( this.value.length > 0 ) {
                $placeholder.addClass( options.hideClass );
              } else {
                $placeholder.removeClass( options.hideClass );
              }
            } );

          $placeholder.bind( 'click.dotcom', function() {
            $input.focus();
            // $placeholder.unbind('click.dotcom');
          } );

          return $placeholder;
        },
        unbindDotcom = function( callback ) {
          $button.unbind( 'click.dotcom' );
          $input.unbind( 'focus.dotcom' );
          settings.$toggle.unbind( 'click.dotcom' );
          $( 'body' ).unbind( 'click.dotcom' );

          if ( typeof callback == "function" ) callback();
        },

        passClickToSubmit = function( e ) {
          var $clicked = $( e.target );
          if ( $clicked.hasClass( "icon-search" ) ) {
            e.preventDefault();
            e.stopPropagation();
            $clicked.parents( 'form' ).find( '.submit' ).click();
          }
        },

        submitNLH = function( e ) {
          e.preventDefault();
          var $form = $( this ),
            term = $form.find( "input[type=text]" ).val(),
            url = $form.attr( "action" ),
            query = ( typeof term === "string" ) ? escape( term ) : "",
            lang = ( typeof $boaLangObj === "object" ) ? $boaLangObj.boaLang.substr( 0, 2 ) :
            "en",
            qs = "#?state={\"query\"%3A\"" + query + "\"%2C\"lang\"%3A\"" + lang + "\"}&id=1";

          location.href = url + qs;
          return false;
        },

        loadNLHEmpty = function( e ) {
          e.preventDefault();
          e.stopPropagation();

          var triggerSuggestions = function() {
              $( 'form', $nlh ).submit();
            },
            checkReady = function() {
              var checkCount = 0,
                checkSearch = function() {
                  checkCount++;
                  if ( boa.search.isNavSearchInitialized || checkCount > 50 ) {
                    clearInterval( checkInterval );
                    triggerSuggestions();
                  }
                },
                checkInterval = setInterval( checkSearch, 250 );
            };
          unbindDotcom( checkReady );
          loadNLH();
        },
        loadNLH = function( e ) {
          // Temporarily block any further interaction with the search
          //
          // $input.attr('disabled','true');

          // Lazy-load the JS and CSS for the NLH Navigation Search module.
          //
          var $form = $input.parents( 'form' ),
            CSS = $form.data( 'css' ),
            JS = $form.data( 'js' ),
            completed = function() {
              $form.unbind( 'submit.dotcom' );
              unbindDotcom( function() {
                setTimeout( function() {
                  settings.$toggle.click();
                  $input.focus();
                }, 600 );
              } );
            },
            failed = function() {
              // $form.addClass('unavailable');
              // $input.attr( 'placeholder', $form.attr('data-text-unavailable') );
              shimPlaceholder( $input );
              unbindDotcom();
            },
            link = document.createElement( 'link' );

          link.type = 'text/css';
          link.rel = 'stylesheet';
          link.href = CSS;
          document.getElementsByTagName( "head" )[ 0 ].appendChild( link );

          // Get and run the Javascript.
          //
          $.ajax( {
            url: JS,
            cache: true,
            dataType: "script",
            success: completed,
            error: failed
          } );

        };

      // Load the Connections font.
      if ( window.cfLoader ) {
        window.cfLoader.init( [ "cnx-regular", "cnx-medium" ] );
      }

      // Get the shared labels
      //
      getLabels();

      // Create a placeholder object/value for unsupported browsers.
      //
      $placeholder = shimPlaceholder( $input );

      $( 'body' ).bind( 'click.dotcom', passClickToSubmit );
      $form.bind( 'submit.dotcom', submitNLH );
      $button.bind( 'click.dotcom', loadNLHEmpty );
      $input.attr( "value", "" ).bind( 'focus.dotcom', loadNLH );
      settings.$toggle.bind( 'click.dotcom', loadNLH );

      $nlh.addClass( "ready" );
    },

    // Ported from search-util/1.0/src/script/lib/util.js
    //
    _injectIcons = function( $container ) {
      var $icons = $( "[data-icon]", $container ).add( $container.filter( "[data-icon]" ) );

      $icons.each( function() {
        var $object = $( this ),
          iconName = $object.data( "icon" ),
          iconClass = $.map( iconName.split( " " ), function( a ) {
            return "icon-" + a;
          } ).join( " " ),
          $icon = $( "<div class=\"icon\"/>" ).addClass( iconClass ),
          iconParts = 4;

        if ( iconName === "#!" ) {
          return;
        }

        for ( var i = 1; i <= iconParts; i++ ) {
          $icon.append( "<div class=\"icon-layer icon-layer--level" + i + "\"/>" );
        }

        $object.removeData( "icon" ).attr( "data-icon", "#!" );
        $object.append( $icon );
      } );
    },

    _initialize = function( options ) {
      var data;

      settings = $.extend( {}, defaults, options, required );
      settings.$target = $( settings.target );
      settings.$toggle = $( settings.toggle );

      /*  Gather all appropriate data attributes associated with this module.
          These can then be accessed as overrides on default actions/behaviors/values.
      */
      for ( data in settings.data ) {
        if ( settings.$target.data( data ) ) {
          settings.data[ data ] = settings.$target.data( data );
        }
      }

      _injectIcons( settings.$target.add( settings.$toggle ) );
      _wireNLH();
    };

  /* Return public functions to be accessed by others.
   */
  return {
    init: _initialize
  };
}();

$( document ).ready( function() {
  navSearch.init();
} );
