/*
 * social-util
 * module_js_id: socialIncludeUtilJS
 *
 * Copyright (c) 2015
 */

var socialLoaderUtilJS = function() {

    /*Define module defaults*/
    var defaults = {
            "target": ".boa-social-loader",
            "$target": "",
            "isLoaded": false,
            "debug": true,
            "lang": "en"
        },

        /*settings holds final module data*/
        settings = {},
        _initialize = function(options) {

            if ( typeof boaVerCheck === "function" && !boaVerCheck("1.7","jquery")) { 
                return;
            }

            settings = $.extend({}, defaults, options);
            settings.$target = $(settings.target);
            settings.lang = $('html').attr('lang') === "es-US" ? "es" : "en";

            for (data in settings.data) {
                if (settings.$target.data(data)) {
                    settings.data[data] = settings.$target.data(data);
                }
            }

            //Do not get sparta run time config
            //_getSpartaRuntimeConfigFile();

            _loadSocial();

        },
        _debug = function(msg) {
            if (window.console && settings.debug) {
                console.log(msg);
            }
        },



        /*_getSpartaRuntimeConfigFile = function() {

            //Grab borneo run time object to store values
            window.boaGlobalData = boaGlobalData || {};
            boaGlobalData.pageDataJS = boaGlobalData.pageDataJS || {};
            boaGlobalData.pageDataJS.spartaRuntimeConfig = {};

            var spartaRuntimeConfig = {};
            //grab sparta runtime config from session storage 
            if (window.sessionStorage && window.sessionStorage.getItem('spartaRuntimeConfig')) {

                try {
                    spartaSessionData = window.sessionStorage.getItem('spartaRuntimeConfig');

                    spartaRuntimeConfig = JSON.parse(spartaSessionData);

                } catch (e) {}
                //or ajax it in and try to store it for next time
            }

            //found the run time config in session storage
            if (!$.isEmptyObject(spartaRuntimeConfig)) {

                boaGlobalData.pageDataJS.spartaRuntimeConfig = spartaRuntimeConfig;
                $('document').trigger('spartaRuntimeConfigLoaded');

            } else {

                $.ajax({
                    dataType: "json",
                    type: 'GET',
                    //TODO: rename runtimeConfig
                    url: '/killSwitch/killSwitch.json',
                    success: function(data) {
                        console.log("kill switch received");
                        console.log(data);

                        //save to session storage
                        //Save run time config in session storage
                        //setSpartaSessionStorage('spartaRuntimeConfig', data);

                        if (data && window.sessionStorage) {
                            try {
                                sessionStorage.setItem('spartaRuntimeConfig', JSON.stringify(spartaRuntimeConfig));
                            } catch (e) {
                                debug("Error: Exceeded Session Storage Limit");
                            }
                        }

                        boaGlobalData.pageDataJS.spartaRuntimeConfig = data;
                        $('document').trigger('spartaRuntimeConfigLoaded');
                    }
                });
            }

        },*/
        _loadSocial = function() {

            //Make ajax call
            var opts = {
                url_en: '/online-banking/mobile-and-online-banking-features/social-partial/',
                url_es: '/online-banking/mobile-and-online-banking-features/social-partial/es/',
                url: '',
                data: ({}), //optional param, Usage: ({selAcct:"Checking",acctType:"to"})
                type: 'GET', //optional param, 'GET' (default) | 'POST'
                dataType: 'html', //optional param, 'html' (default) | 'json'
                timeout: 20000, //optional param, milliseconds
                loadingImageClass: 'ajax-loading-image-med', //optional param.  Pass in CSS classname from module CSS to change image
                errorMessage: null, //optional param.  Defaults to blank module (no error message to user).  If passed, will show formatted error
                callbackFunction: null, //optional param.  Required for json response or if client wants to handle the response.  If passed, will be called from $.ajax success function as opts.callbackFunction(data,$targetModule,options); 
                timeoutCallback: null, //optional callback on ajax timeout, passes args (textStatus,errorThrown);
                errorCallback: null, //optional callback on ajax error, passes args (textStatus,errorThrown);
                //jsonpCallback: null
                jsonpCallback: 'jsonpCallback' //Hard code jsonpCallback for testing locally
            };

            opts.url = (settings.lang === "es" ? opts.url_es : opts.url_en);

            $.ajax({
                url: opts.url,
                dataType: opts.dataType,
                //jsonpCallback: opts.jsonpCallback,
                //crossDomain: true,
                //cache: false,
                //data: opts.data,
                //type: opts.type,
                //timeout: opts.timeout,

                beforeSend: function() {},

                error: function(XMLHTTPRequest, textStatus, errorThrown) {

                    //Throw error, show error message to user
                    boaSocialLoaderError('boaSnippetLoader error.  textStatus: ' + textStatus + ' errorThrown: ' + errorThrown);

                    /*
					 //If this is a timeout, check for timeout callback function
                    if (textStatus === "timeout" && opts.timeoutCallback !== null && $.isFunction(opts.timeoutCallback) === true) {

                        opts.timeoutCallback(textStatus, errorThrown);

                    }
                    //Check for Error callback function
                    if (opts.errorCallback !== null && $.isFunction(opts.errorCallback) === true) {

                        opts.errorCallback(textStatus, errorThrown);

                    }
                    */
                },

                success: function(data) {
                    //Check for valid response
                    if (typeof(data) === "undefined" || data.length === 0) {

                        boaSocialLoaderError('boaSnippetLoader error.  Response is empty');

                    } else {

                        processResponse(data);

                        /*
                        //Check for custom callback function to process response
                        if (opts.callbackFunction !== null && $.isFunction(opts.callbackFunction) === true) {

                            opts.callbackFunction(data, $targetModule, opts);

                            //Default response processor
                        } else {

                            processResponse(data);

                        }*/
                    }
                },
                complete: function(XMLHTTPRequest, textStatus) {
                    //Clean up after ajax request
                }
            });

            /* Default response processor
            if html snippet, add to module
            if json, module should implement custom callback function
            Make sure DOM is loaded before injecting html*/
            function processResponse(data) {

                if (opts.dataType === "html") {
                    $(function() {
                        settings.$target.html(data);
                    });
                } else if (opts.dataType === "jsonp") {
                    $(function() {
                        settings.$target.html(data.htmlSource);
                    });
                } else {
                    boaSocialLoaderError('boaSnippetLoader error.  datatype not html, client should implement custom callback function to parse json');
                }

            }

            /*error handler*/
            function boaSocialLoaderError(errorMessage) {

                //Define error container. 
                var snippetLoadErrorDiv =
                    '<div class="error-page-level hide">' +
                    '<div class="error-corner top-left"></div>' +
                    '<div class="error-corner top-right"></div>' +
                    '<div class="error-content">' + opts.errorMessage + '</div>' +
                    '<div class="error-corner bottom-left"></div>' +
                    '<div class="error-corner bottom-right"></div>' +
                    '<div id="boaSocialLoaderErrorCode" class="hide"></div></div>';

                //Load error container
                settings.$target.html(snippetLoadErrorDiv)
                    .find('#boaSocialLoaderErrorCode')
                    .append(errorMessage);

                //Check options to show error message to user
                if (opts.errorMessage != null && opts.errorMessage.length !== 0) {
                    settings.$target.find('.error-page-level').removeClass('hide');
                }

                //send error message to global Error Handler
                if (typeof boaTLAddCustomEvent === "function") {
                    boaTLAddCustomEvent(errorMessage, "boaSocialLoaderError");
                }
            }
        };

    /* Return public functions to be accessed by others.
     */
    return {
        init: _initialize
    };
}();

//Init social loader when doc is ready
$(document).ready(function() {
    if ($('.boa-social-loader').length > 0) {
        socialLoaderUtilJS.init();
    }

});