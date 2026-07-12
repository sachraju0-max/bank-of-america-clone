/*
 * boa.common.js
 * Common javascript to be run on every page of the web site.
 *
 * Copyright Bank of America
 *
 */

var boa = window.boa || {};
boa.common = (function() {

    // private - this is called on document ready.
    function init() {
        //initialize common code
        $boaLangObj = boaLangSetup();
        dialogSetup();
        actionLayerSetup();
        printPage();
        toggleSetup();
        windowSetup();
        stateLicensePopupSetup();
        boaCommonSetup();
        linkStyling();
        dartTagSetup();
    }

    //Setup JS that runs immediately
    function jsSetup() {

        //Remove bad chars from URL hash
        if (window.location.hash) {
            window.location.hash = window.location.hash.replace(/[^-a-zA-Z0-9@.:/_?=#&+|~% ]/g, '');
        }

        //Prevent IE errors with console
        if (!window.console) {
            console = {
                log: function() {},
                debug: function() {}
            };
        }
        /*Store global boa data*/
        window.boaGlobalData = {
            settings: {
                "debug": false
            },
            pageDataJS: {},
            debug: function(msg) {
                if (window.console && settings.debug) {
                    console.log(msg);
                }
            }
        };

    }

    /*Dialog Setup Function
     *
     * Dialogs are automatically sized based on the width of the content
     * Specific sizes can be set using $classString
     */
    function dialogSetup() {
        $('.boa-dialog').on('click', function(ev) {
            var $returnFocusLink = $(this),
                $id = $(this).attr('rel'),
                $classString = $(this).attr('class'),
                _size = $('#' + $id + ' > :not(".ada-hidden")').text().replace(/  /g, '').length,
                $this = $('#' + $id),
                $thisDialog = $this.parent('div.ui-dialog'),
                positionCollision = $returnFocusLink.attr('data-ui-layer-collision') || "fit fit";

            //If glossary term is already is open we have a dialog box, reposition to mouse position
            if (!$returnFocusLink.hasClass('isOpen') && $this.hasClass('ui-dialog-content')) {
                $("a[rel^='" + $id + "']").removeClass('isOpen');
                $returnFocusLink.addClass('isOpen');

                // calculate position based on size of dialog
                // and relation to viewport and mouse
                var sCommand,
                    _mouseTop = ev.pageY,
                    _mouseLeft = ev.pageX,
                    _top,
                    _left,
                    spacingX = 10,
                    spacingY = 20,
                    _dialogHeight = $this.outerHeight(),
                    _dialogWidth = $this.outerWidth(),
                    _dialogTop = $this.offset().top,
                    _dialogLeft = $this.offset().left,
                    _scrollTop = $(document).scrollTop(),
                    _scrollLeft = $(document).scrollLeft(),
                    _screenHeight = $('body').height(),
                    _availTop = (_mouseTop - _scrollTop - _dialogHeight - spacingY) > 0,
                    _availRight = (_mouseLeft + _dialogWidth + _scrollLeft + spacingX) < $(window).width(),
                    _availBottom = (_mouseTop + _scrollTop + _dialogHeight + spacingY) < $(window).height(),
                    _availLeft = (_mouseLeft - _dialogWidth - _scrollLeft - spacingX) > 0,
                    _forceTop,
                    _moveX,
                    _moveY,
                    _smoveX,
                    _smoveY,
                    _distance,
                    _time,
                    checkClassWidth,
                    width,
                    newClass;

                //if keyboard event, offset dialog position
                _mouseLeft = ev.pageX === 0 ? $this.offset().left : ev.pageX;
                if (ev.pageX === 0) {
                    _mouseTop = $this.offset().top;
                }

                _moveX = _mouseTop + spacingY - _dialogTop;
                _moveY = _mouseLeft + spacingX - _dialogLeft;

                _distance = Math.sqrt(Math.pow(_mouseTop - _dialogTop, 2) - Math.pow(_mouseLeft - _dialogLeft, 2));

                // calculate position based on size of dialog
                if (_moveX < 0) {
                    _smoveX = '-=' + Math.abs(_moveX);
                } else {
                    _smoveX = '+=' + _moveX;
                }

                if (_moveY < 0) {
                    _smoveY = '-=' + Math.abs(_moveY);
                } else {
                    _smoveY = '+=' + _moveY;
                }

                //If glossary term if already is open, move it
                $thisDialog.animate({
                    top: _smoveX,
                    left: _smoveY
                }, 200, function() {
                    $('.ui-dialog-titlebar-close', $thisDialog).focus();
                });

            } else {
                $('.ui-dialog-titlebar-close', $thisDialog).focus();
            }

            /* combine dotcom & olb info layers*/
            if ($classString.match('boa-com-info-layer-link') || $classString.match('boa-info-layer-link')) {
                newClass = 'boa-com-info-layer';

                //Get width from class: boa-info-layer-width-(\d+) or boa-com-info-layer-width-(\d+)
                checkClassWidth = $classString.match(/boa(-com)?-info-layer-width-(\d+)/);

                if (checkClassWidth !== null && checkClassWidth.length > 1 && typeof(checkClassWidth[2]) !== "undefined") {
                    width = checkClassWidth[2];

                } else if ((_size > 800)) {
                    width = 500;
                } else if ((_size > 350)) {
                    width = 350;
                } else {
                    width = 250;
                    newClass = 'boa-com-info-layer boa-com-info-small-title';
                }
            }

            /*Original dialogs*/
            else {
                // widths of dialogs
                if ($classString.match('force-xlarge')) {
                    newClass = 'custom xlarge';
                    width = 675;
                } else if ($classString.match('dialog-500px')) {
                    newClass = 'custom dialog-500px';
                    width = 500;
                } else if ((_size >= 500) || ($classString.match('force-large'))) {
                    newClass = 'custom large';
                    width = 326;
                } else if ((((_size > 250) && (_size < 500)) || ($classString.match('force-medium'))) && !($classString.match('force-small'))) {
                    newClass = 'custom med';
                    width = 254;
                } else if ($classString.match('force-small')) {
                    newClass = 'custom sm';
                    width = 215;
                } else {
                    newClass = 'custom sm';
                    width = 215;
                }
            }

            if ($classString.match('no-return-focus')) {
                $returnFocusLink = "";
            }

            //Add class="close-dialogs" to close any open dialogs before opening this one.
            if ($(this).hasClass('close-dialogs')) {
                closeDialogs();
            }
            $(this).addClass('force-visited');
            $('#' + $id).dialog({
                bgiframe: true,
                stack: true,
                resizable: false,
                dialogClass: newClass,
                closeText: $boaLangObj.closeText,
                width: width,
                minHeight: 0,
                marginTop: '-1px',
                open: function() {
                    var $this = $(this);
                    //Grab referrence to the top div for dialog
                    var $dialogWrapper = $this.closest('.ui-dialog');
                    $returnFocusLink.addClass('isOpen');

                    //ADA - Add title to close link
                    var closeADAText = $boaLangObj.layerClose;

                    if ($this.find('span.ada-title').length > 0) {
                        closeADAText += $boaLangObj.layerCloseSpacer + $this.find('span.ada-title').text();
                    } else if ($this.find('h3').length > 0) {
                        closeADAText += $boaLangObj.layerCloseSpacer + $this.find('h3:first').text();
                    } else if ($this.find('h4').length > 0) {
                        closeADAText += $boaLangObj.layerCloseSpacer + $this.find('h4:first').text();
                    } else if ($returnFocusLink.length > 0 && $returnFocusLink.text().length > 0) {
                        closeADAText += $boaLangObj.layerCloseSpacer + $returnFocusLink.text().replace(/layer/g, "");
                    } else if ($this.find('p').length > 0) {
                        closeADAText += $boaLangObj.layerCloseSpacer + $this.find('p:first').text().substr(0, 50);
                    }
					
					//To fix Close text issue in modal dialogs due to jquery-ui upgrade 1.12.1 
					if (boaVerCheck("1.12.1", "jqueryui")) {
					var $uiDialogTitleClose = $('.ui-dialog-titlebar-close');
                    $uiDialogTitleClose.find('span.ui-icon-closethick').remove();
                    $uiDialogTitleClose.addClass('ui-state-default').append('<span class="ui-button-icon ui-icon ui-icon-closethick"></span>');
					}
					
                    //ADA - Add title to close link
                    $('.ui-dialog-titlebar-close', $dialogWrapper).append('<span class="ada-hidden">&nbsp; ' + closeADAText + '</span>').removeAttr('role').removeAttr('title').attr('id', $id + "-CloseLink");

                    //Add End of Info Panel content and close link on bottom
                    if ($('.boa-ada-end', $this).length === 0) {
                        $this.append('<span class="boa-ada-end ada-hidden">End of layer.</span>');
                    }

                    //Use jQuery UI position options
                    if (boaVerCheck("1.11.0", "jqueryui") && $.ui.position) {

                        $this.dialog("option", "position", {
                            my: "left bottom",
                            at: "right top",
                            of: $returnFocusLink,
                            collision: positionCollision
                        });

                    } else {

                        /* old positioning logic */
                        // calculate position based on size of dialog
                        // and relation to viewport and mouse
                        var _mouseTop, _mouseLeft, _top, _left, spacingX, spacingY, _dialogHeight, _dialogWidth, _scrollTop, _scrollLeft, _availTop, _availRight, _availBottom, _availLeft, _forceTop, _screenHeight;
                        _mouseTop = ev.pageY;
                        _mouseLeft = ev.pageX;
                        //if keyboard event, offset dialog position
                        _mouseLeft = ev.pageX === 0 ? $this.offset().left : ev.pageX;
                        if (ev.pageX === 0) {
                            _mouseTop = $this.offset().top;
                        }
                        spacingX = 10;
                        spacingY = 20;
                        _dialogHeight = $this.outerHeight();
                        _dialogWidth = $this.outerWidth();
                        _scrollTop = $(document).scrollTop();
                        _scrollLeft = $(document).scrollLeft();
                        _screenHeight = $('body').height();
                        _availTop = (_mouseTop - _scrollTop - _dialogHeight - spacingY) > 0;
                        _availRight = (_mouseLeft + _dialogWidth + _scrollLeft + spacingX) < $(window).width();
                        _availBottom = (_mouseTop + _scrollTop + _dialogHeight + spacingY) < $(window).height();
                        _availLeft = (_mouseLeft - _dialogWidth - _scrollLeft - spacingX) > 0;
                        if (_availTop && _availRight) {
                            _top = _mouseTop - _scrollTop - _dialogHeight - spacingY;
                            _left = _mouseLeft + spacingX;
                        } else if (_availBottom && _availRight) {
                            _top = (_mouseTop + spacingY) - _scrollTop;
                            _left = _mouseLeft + spacingX;
                        } else if (_availTop && _availLeft) {
                            _top = (_mouseTop - _scrollTop) - _dialogHeight - spacingY;
                            _left = _mouseLeft - _dialogWidth - spacingX;
                        } else if (_availBottom && _availLeft) {
                            _top = (_mouseTop + spacingY) - _scrollTop;
                            _left = _mouseLeft - _dialogWidth - spacingX;
                            //content height > veiwable space -> force dialog to top of viewport
                        } else if (_dialogHeight > $(window).height()) {
                            _forceTop = true;
                            _top = (_scrollTop + spacingY);
                            _left = _mouseLeft + spacingX;
                        } else {
                            _top = (_mouseTop + spacingY) - _scrollTop;
                            _left = _mouseLeft + spacingX;
                        }
                        //manually set top if content too large, jQuery will align to bottom
                        if (_forceTop) {
                            if (_top + _dialogHeight > _screenHeight) { // reset _top if dialog is going to extend down past bottom of screen
                                _top = (_screenHeight - _dialogHeight);
                            }
                            $dialogWrapper.css('top', _top);
                        } else {
                            $this.dialog('option', 'position', [_left, _top]);
                        }

                    } // end $.ui.position

                    $('.ui-dialog-titlebar-close', $dialogWrapper).focus();
                },
                close: function() {
                    $returnFocusLink.removeClass('isOpen');
                    $(this).dialog('destroy');
                    if ($returnFocusLink.length > 0) {
                        $returnFocusLink.focus();
                    }
                }
            }).dialog('open');

            //Remove role attribute to fix JAWs form issues
            $('#' + $id).parent().removeAttr("role");

            // Add close dialog behavior to any popup-link
            // within a dialog so that it not only opens the new
            // popup  but also closes its parent dialog
            $('#' + $id).find('a').each(function() {
                if ($(this).hasClass('popup-link')) {
                    // yup we found a popup-link so
                    // its safe to reference the class
                    $('.popup-link').click(function(e) {
                        $(e.target).parent().parent().dialog("close");
                    });
                    return false;
                }
            });

            $('html').trigger('boa-dialog-clicked', [$returnFocusLink, $this]);

            return false;
        });
        // Add the dotted underline class to each of the boa-dialog links
        $('.boa-dialog').each(function() {
            var $this = $(this);
            $this.addClass('dotted');
            //Add " Information Panel" to .boa-dialog links, unless it hasClass "no-ada-text"
            if (!$this.hasClass('no-ada-text')) {
                $this.append('<span class="boa-ada-text ada-hidden">&nbsp;layer</span>');
            }
        });
    }

    function closeDialogs() {
        $('.ui-dialog-content').trigger('dialogclose').parent().remove();
    }

    function actionLayerSetup() {
        $('.boa-action').on('click', function(ev) {
            var $link = $(this),
                $returnFocusToLink = $link,
                $id = $link.attr('rel'),
                $content = $('#' + $id),
                title = $content.find('h3').hide().text(),
                $width = 254,
                $classString = $link.attr('class'),
                $class = 'custom action',
                $modal = false,
                $notitle = false,
                closeText = $boaLangObj.closeText,
                dataCloseADAText = $link.attr('data-close-ada-text'),
                taskLayerType = "",
                taskLayerPosition = "",
                _offsetTop = $link.offset().top,
                _offsetTopAdjust = 51,
                _offsetLeft = $link.offset().left,
                _offsetLeftAdjust = 40,
                _browserWidth = $('body').width(),
                _left,
                _arrowPosition,
                _topAdjust,
                _dialogLeft, _dialogTop,
                _arrowPositionAdjust = 0,
                _arrowMaxPosition,
                _linkWidth = $link.width(),
                $activeActionLink = $link,
                activeMouseTop = ev.pageY,
                activeMouseLeft = ev.pageX,
                checkClassWidth,
                //override h / v collision setting
                positionCollision = $link.attr('data-ui-layer-collision') || "fit none";

            //Add class="close-dialogs" to close any open dialogs before opening this one.
            if ($link.hasClass('close-dialogs')) {
                $('.ui-dialog').remove();
            }

            //No title is shared across many types
            if ($link.hasClass("boa-action-notitle")) {
                $notitle = true;
                $class += ' boa-action-notitle';
            }

            if ($link.hasClass('action-wide')) {
                $width = 500;
                $class += ' wide';

            } else if ($link.hasClass('action-width-742')) {
                $width = 742;
                $class += ' width-742';

            } else if ($link.hasClass('fsd3-modeless-left')) {
                $class += ' fsd3 left-arrow';

            } else if ($link.hasClass('fsd3-modeless-right')) {
                $class += ' fsd3 right-arrow';
            }

            if ($link.hasClass("boa-action-modal")) {
                $modal = true;
                $class += ' boa-action-modal';
            }

            /*Add your own class to the top level task layer div*/
            var taskLayerCustomClass = $classString.match(/(task-layer-custom-class-.*)/);
            if (taskLayerCustomClass !== null && taskLayerCustomClass.length > 0 && typeof(taskLayerCustomClass[1]) !== "undefined") {
                $class += ' ' + taskLayerCustomClass[1];
            }

            /******************************
		* Ux Toolkit 3.5 task layers
		/******************************/

            //Modeless Task Layer - com & olb layers now combined
            if ($link.hasClass('boa-com-task-layer-link') || $link.hasClass('boa-task-layer-link')) {

                closeDialogs();

                taskLayerType = "boa-com-task-layer";

                //See if width is set by boa-task-layer-width-(\d+) or boa-com-task-layer-width-(\d+)/);
                checkClassWidth = $classString.match(/boa(-com)?-task-layer-width-(\d+)/);

                if (checkClassWidth !== null && checkClassWidth.length > 1 && typeof(checkClassWidth[2]) !== "undefined") {
                    $width = parseInt(checkClassWidth[2]);
                } else {
                    $width = 361;
                }

                //Mini Task Layer
                if ($link.hasClass("boa-task-layer-mini")) {
                    taskLayerType = "boa-task-layer-mini";
                    $class += ' boa-com-task-layer boa-task-layer-mini';
                    if (checkClassWidth !== null && checkClassWidth.length > 1 && typeof(checkClassWidth[2]) !== "undefined") {
                        $width = parseInt(checkClassWidth[2]);
                    } else {
                        $width = 150;
                    }
                    //force right
                    if ($link.hasClass("boa-task-layer-right")) {
                        taskLayerPosition = "right";
                        // place on the left if there is available space
                    } else if (_offsetLeft > $width) { //*position to the left
                        taskLayerPosition = "left";
                        $class += ' boa-com-task-left left ';
                    }

                } else if ($link.hasClass("boa-task-custom-doc-inbox")) {
                    //Special case - statements pages continue to use a custom olb task layer design for PDF list
                    taskLayerType = "boa-olb-task-layer";
                    taskLayerPosition = "right";
                    $width = 235;
                    $class += ' boa-task-layer boa-task-custom-doc-inbox';

                } else if ($link.hasClass('boa-com-task-layer-top')) {

                    taskLayerPosition = "top";
                    $class += ' boa-com-task-layer boa-com-task-top ';

                } else if ($link.hasClass('boa-com-task-layer-bottom')) {

                    taskLayerPosition = "bottom";
                    $class += ' boa-com-task-layer boa-com-task-bottom ';

                } else if ($link.hasClass('boa-com-task-layer-left')) {

                    taskLayerPosition = "left";
                    $class += ' boa-com-task-layer boa-com-task-left left ';

                } else if ($link.hasClass('boa-com-task-layer-right') || $link.hasClass('boa-task-layer-right')) {

                    taskLayerPosition = "right";
                    $class += ' boa-com-task-layer ';

                } else {

                    //or determine left/right based on available spaces
                    if (_offsetLeft > $width) {

                        taskLayerPosition = "left";
                        $class += ' boa-com-task-layer boa-com-task-left left ';

                    } else {
                        //default right
                        $class += ' boa-com-task-layer ';

                    }
                }
            }

            /*if position is not already set, calculate position*/
            if (taskLayerPosition.length === 0) {

                //open layer on the left if there is room
                if (_offsetLeft > $width) {

                    _left = _offsetLeft - ($width + _offsetLeftAdjust);
                    $class += ' left';
                    taskLayerPosition = "left"

                    //else open on the right
                } else {

                    _left = (_offsetLeft + $link.width()) + _offsetLeftAdjust;
                }

            }

            // invoke the dialog
            $content.dialog({
                modal: $modal,
                title: title,
                draggable: false,
                resizable: false,
                dialogClass: $class,
                closeText: closeText,
                width: $width,
                open: function(event) {

                    /* Put all positioning code in the open fn, so its done after the layer is rendered*/
                    var $this = $(this);
                    var _mouseTop, _mouseLeft, _top, spacingX, spacingY, _dialogHeight, _dialogWidth, _scrollTop, _scrollLeft, _availTop, _availRight, _availBottom, _availLeft, _forceTop, _screenHeight, _linkCenter;
                    var _eventKeyPress = false;

                    //guess if keyboard event if mouse X position is outside of link
                    if (ev.pageX <= 0 || ev.pageX > $returnFocusToLink.offset().left + $returnFocusToLink.width()) {
                        _eventKeyPress = true;
                    }

                    //if key click, set click position to middle of link (for arrow calulations)
                    _mouseLeft = _eventKeyPress ? $returnFocusToLink.offset().left + ($returnFocusToLink.width() / 2) : ev.pageX;

                    //pos arrow in vertical center of link
                    _linkCenter = $returnFocusToLink.offset().top + ($returnFocusToLink.height() / 2);
                    _mouseTop = _linkCenter > 0 ? _linkCenter : $returnFocusToLink.offset().top;

                    spacingX = 10;
                    spacingY = 20;
                    _dialogHeight = $this.outerHeight();
                    _dialogParentHeight = $this.parent().height();
                    _dialogWidth = $this.outerWidth();
                    _scrollTop = $(document).scrollTop();
                    _scrollLeft = $(document).scrollLeft();
                    _screenHeight = $('body').height();
                    _availTop = (_mouseTop - _scrollTop - _dialogHeight - spacingY) > 0;
                    _availRight = (_mouseLeft + _dialogWidth + _scrollLeft + spacingX) < $(window).width();
                    _availBottom = (_mouseTop + _scrollTop + _dialogHeight + spacingY) < $(window).height();
                    _availLeft = (_mouseLeft - _dialogWidth - _scrollLeft - spacingX) > 0;

                    //Grab referrence to the top div for dialog
                    var $dialogWrapper = $this.closest('.ui-dialog');
                    var $dialogTitle = $('.ui-dialog-title', $dialogWrapper);
                    var $dialogCloseLink = $('.ui-dialog-titlebar-close', $dialogWrapper);

                    //Modify Title for Mini Task layer or No-title action class
                    if ($notitle === true) {
                        $dialogTitle.empty().removeAttr('role').removeAttr('title');
                        $dialogCloseLink.find('span').append('<span class="ada-hidden"> ' + $boaLangObj.closeText + '</span>');
                    } else if (taskLayerType === "boa-task-layer-mini") {
                        $dialogTitle.empty();
                    }

                    //ADA - Add title or unique text to close link

                    var closeADAText = $boaLangObj.layerClose;

                    //Get custom ADA close text from link attribute
                    if (dataCloseADAText && dataCloseADAText.length > 0) {
                        closeADAText += $boaLangObj.layerCloseSpacer + dataCloseADAText;
                        //Or Add title to close link
                    } else if (title.length > 0) {
                        closeADAText += $boaLangObj.layerCloseSpacer + title;
                        //Or use link text
                    } else if ($returnFocusToLink.length > 0 && $returnFocusToLink.text().length > 0) {
                        closeADAText += $boaLangObj.layerCloseSpacer + $returnFocusToLink.text().replace(/layer/g, "");
                        //Or first 50 characters from content
                    } else if ($this.find('p').length > 0) {
                        closeADAText += $boaLangObj.layerCloseSpacer + $this.find('p:first').text().substr(0, 50);
                    }

                    $dialogCloseLink.append('<span class="ada-hidden">&nbsp; ' + closeADAText + '</span>').removeAttr('role').removeAttr('title').attr('id', $id + "-CloseLink");
					
					//To fix Close text issue in modals due to jquery-ui upgrade 1.12.1
					if (boaVerCheck("1.12.1", "jqueryui")) {
					$dialogCloseLink.find('span.ui-icon-closethick').remove();
					$dialogCloseLink.addClass('ui-state-default').append('<span class="ui-button-icon ui-icon ui-icon-closethick" style="display:inline-block"></span>');
					}       

                    //Move close link to after title, then set ADA focus
                    $dialogTitle.detach();
                    $dialogCloseLink.after($dialogTitle).focus();

                    //ADA - Add End of Info Panel content and close link on bottom
                    if ($('.boa-ada-end', $this).length === 0) {
                        $this.append('<div class="boa-ada-end ada-hidden">End of layer.</div>');
                    }

                    // For non-modals, insert the arrow into the dialog
                    if ($modal === false) {
                        if ($('.dialog-arrow', $this).length < 1) {
                            $this.dialog().parent().append('<div class="dialog-arrow"></div>');
                        }
                        // adjust the position based on the current scroll and element position
                        var _currentScroll = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
                    }
                    /*Cardlytics layers*/
                    if ($('.cardlytics-flyout:visible').length > 0) {
                        // fix cardlytics flyout positioning globally
                        $('.cardlytics-flyout:visible').parents('.ui-dialog').css('top', $activeActionLink.position().top - 50).
                        css('left', $activeActionLink.position().left + $activeActionLink.width() + 50).removeClass('left');

                    } else if ($('.alt-cardlytics-flyout:visible').length > 0) {

                        $('.alt-cardlytics-flyout:visible').parents('.ui-dialog').addClass('left').css('top', activeMouseTop - 55).css('left', (activeMouseLeft - $('.alt-cardlytics-flyout:visible').width()) - 120).css('right', (activeMouseLeft + $('.alt-cardlytics-flyout:visible').width()) - 120);

                    } else {

                        /** COM Task Layer Bottom (top arrow) - position on the screen and the arrow in relation to the link*/
                        if (taskLayerType === "boa-com-task-layer" && taskLayerPosition === "bottom") {

                            /* Using jQuery UI .position() to place the dialog*/
                            if (boaVerCheck("1.11.0", "jqueryui") && $.ui.position) {

                                $this.dialog("option", "position", {
                                    my: "center top+30",
                                    at: "center bottom",
                                    of: $returnFocusToLink,
                                    collision: positionCollision
                                });
                                //Old version
                            } else {
                                //Move layer on the screen
                                $this.dialog("widget").position({
                                    my: 'left top',
                                    at: 'left bottom',
                                    of: $returnFocusToLink,
                                    offset: "-40 28",
                                    collision: positionCollision
                                });
                            }

                            //Position adjustments for layer
                            _offsetTopAdjust = 260;
                            _offsetLeftAdjust = -40;
                            _arrowPositionAdjust = -25;
                            _arrowMaxPositionAdjust = 20;
                            _left = (_offsetLeft + _offsetLeftAdjust);
                            _topAdjust = (_offsetTop - _currentScroll) - $this.dialog().parent().height() + _offsetTopAdjust;

                            //recalculate actual _left based on jquery collision positioning when layer hits the edge
                            dialogOffset = $dialogWrapper.offset();
                            _dialogLeft = dialogOffset.left;
                            _dialogTop = dialogOffset.top;

                            //calculate arrow position & maximum position
                            _arrowPosition = _mouseLeft - _dialogLeft + _arrowPositionAdjust;
                            _arrowMaxPosition = _dialogWidth - _arrowMaxPositionAdjust;
                            if (_arrowPosition > _arrowMaxPosition) {
                                _arrowPosition = _arrowMaxPosition;
                            } else if (_arrowPosition < 5) {
                                _arrowPosition = 5
                            };
                            $('.dialog-arrow', $dialogWrapper).css('left', _arrowPosition);


                            /** COM Task Layer Top (bottom arrow) - position on the screen and the arrow in relation to the link*/

                        } else if (taskLayerType === "boa-com-task-layer" && taskLayerPosition === "top") {

                            //Position adjustments for layer
                            _offsetTopAdjust = -50;
                            _offsetLeftAdjust = -40;
                            _arrowPositionAdjust = -25;
                            _arrowMaxPositionAdjust = 20;
                            _left = (_offsetLeft + _offsetLeftAdjust);
                            _topAdjust = (_offsetTop - _currentScroll) - $this.dialog().parent().height() + _offsetTopAdjust;

                            /* Using jQuery UI .position() to place the dialog*/
                            if (boaVerCheck("1.11.0", "jqueryui") && $.ui.position) {
                                $this.dialog("option", "position", {
                                    my: "center bottom-30",
                                    at: "center top",
                                    of: $returnFocusToLink,
                                    collision: positionCollision
                                });
                            } else {
                                //Move layer on the screen
                                $this.dialog('option', 'position', [_left, _topAdjust]);
                            }


                            //recalculate actual _left based on jquery collision positioning when layer hits the edge
                            dialogOffset = $dialogWrapper.offset();
                            _dialogLeft = dialogOffset.left;
                            _dialogTop = dialogOffset.top;

                            //calculate arrow position & maximum position
                            _arrowPosition = _mouseLeft - _dialogLeft + _arrowPositionAdjust;
                            _arrowMaxPosition = _dialogWidth - _arrowMaxPositionAdjust;
                            if (_arrowPosition > _arrowMaxPosition) {
                                _arrowPosition = _arrowMaxPosition;
                            } else if (_arrowPosition < 8) {
                                _arrowPosition = 8
                            };
                            $('.dialog-arrow', $dialogWrapper).css('left', _arrowPosition);


                            /** COM Task Layer Left/Right - position on the screen and the arrow in relation to the link*/
                        } else if (taskLayerType === "boa-com-task-layer") {

                            //Position adjustments for layer
                            _offsetTopAdjust = 70;
                            _arrowPositionAdjust = -25;
                            _arrowMaxPositionAdjust = 40; //account for default margin + image height

                            //Left layer positioning
                            if (taskLayerPosition === "left") {
                                _offsetLeftAdjust = -90;
                                _left = (_offsetLeft - $this.width()) + _offsetLeftAdjust;
                            } else {
                                _offsetLeftAdjust = 40;
                                _left = (_offsetLeft + _linkWidth) + _offsetLeftAdjust;
                            }

                            _topAdjust = (_offsetTop - _currentScroll) - _offsetTopAdjust;

                            /* Using jQuery UI .position() to place the dialog*/
                            if (boaVerCheck("1.11.0", "jqueryui") && $.ui.position) {
                                if (taskLayerPosition === "left") {
                                    $this.dialog("option", "position", {
                                        my: "right-30 center",
                                        at: "left center",
                                        of: $returnFocusToLink,
                                        collision: positionCollision
                                    });
                                } else {
                                    $this.dialog("option", "position", {
                                        my: "left+30 center",
                                        at: "right center",
                                        of: $returnFocusToLink,
                                        collision: positionCollision
                                    });
                                }
                            } else {
                                //Move layer on the screen
                                $this.dialog('option', 'position', [_left, _topAdjust]);
                            }
                            //recalculate actual _left based on jquery collision positioning when layer hits the edge
                            dialogOffset = $dialogWrapper.offset();
                            _dialogLeft = dialogOffset.left;
                            _dialogTop = dialogOffset.top;

                            //calculate arrow position & maximum position
                            _arrowPosition = _mouseTop - _dialogTop + _arrowPositionAdjust;
                            _arrowMaxPosition = _dialogParentHeight - _arrowMaxPositionAdjust;
                            if (_arrowPosition > _arrowMaxPosition) {
                                _arrowPosition = _arrowMaxPosition;
                            }
                            $('.dialog-arrow', $dialogWrapper).css('top', _arrowPosition);

                            /** Mini Task Layer Left/Right */
                        } else if (taskLayerType === "boa-task-layer-mini") {

                            //Position adjustments for layer
                            _offsetTopAdjust = 40;
                            _arrowPositionAdjust = -25;
                            _arrowMaxPositionAdjust = 30; //account for default margin + image height

                            //Left layer positioning
                            if (taskLayerPosition === "left") {
                                _offsetLeftAdjust = -70;
                                _left = (_offsetLeft - $this.width()) + _offsetLeftAdjust;
                            } else {
                                _offsetLeftAdjust = 25;
                                _left = (_offsetLeft + _linkWidth) + _offsetLeftAdjust;
                            }

                            _topAdjust = (_offsetTop - _currentScroll) - _offsetTopAdjust;

                            /* Using jQuery UI .position() to place the dialog*/
                            if (boaVerCheck("1.11.0", "jqueryui") && $.ui.position) {
                                if (taskLayerPosition === "left") {

                                    $this.dialog("option", "position", {
                                        my: "right-30 center",
                                        at: "left center",
                                        of: $returnFocusToLink,
                                        collision: positionCollision
                                    });
                                } else {
                                    $this.dialog("option", "position", {
                                        my: "left+30 center",
                                        at: "right center",
                                        of: $returnFocusToLink,
                                        collision: positionCollision
                                    });
                                }
                            } else {
                                //Move layer on the screen
                                $this.dialog('option', 'position', [_left, _topAdjust]);
                            }

                            //recalculate actual _left based on jquery collision positioning when layer hits the edge
                            dialogOffset = $dialogWrapper.offset();
                            _dialogLeft = dialogOffset.left;
                            _dialogTop = dialogOffset.top;

                            //calculate arrow position & maximum position
                            _arrowPosition = _mouseTop - _dialogTop + _arrowPositionAdjust;
                            _arrowMaxPosition = _dialogParentHeight - _arrowMaxPositionAdjust;
                            if (_arrowPosition > _arrowMaxPosition) {
                                _arrowPosition = _arrowMaxPosition;
                            }
                            $('.dialog-arrow', $dialogWrapper).css('top', _arrowPosition);

                            /** OLB Task Layer Left/Right - position on the screen and the arrow in relation to the link*/
                        } else if (taskLayerType === "boa-olb-task-layer") {

                            //Position adjustments for layer
                            _offsetTopAdjust = 41;
                            _arrowPositionAdjust = -47;
                            _arrowMaxPositionAdjust = 40; //account for default margin + image height
                            _topAdjust = (_offsetTop - _currentScroll) - _offsetTopAdjust;
                            if (taskLayerPosition === "left") {
                                _offsetLeftAdjust = -50;
                                _left = (_offsetLeft - $this.width()) + _offsetLeftAdjust;
                            } else {
                                _offsetLeftAdjust = 30
                                _left = (_offsetLeft + _linkWidth) + _offsetLeftAdjust;
                            }

                            /* Using jQuery UI .position() to place the dialog*/
                            if (boaVerCheck("1.11.0", "jqueryui") && $.ui.position) {
                                if (taskLayerPosition === "left") {

                                    $this.dialog("option", "position", {
                                        my: "right-30 center",
                                        at: "left center",
                                        of: $returnFocusToLink,
                                        collision: positionCollision
                                    });
                                } else {
                                    $this.dialog("option", "position", {
                                        my: "left+30 center",
                                        at: "right center",
                                        of: $returnFocusToLink,
                                        collision: positionCollision
                                    });
                                }
                            } else {
                                //Move layer on the screen
                                $this.dialog('option', 'position', [_left, _topAdjust]);
                            }

                            //recalculate actual _left based on jquery collision positioning when layer hits the edge
                            dialogOffset = $dialogWrapper.offset();
                            _dialogLeft = dialogOffset.left;
                            _dialogTop = dialogOffset.top;

                            //calculate arrow position & maximum position
                            _arrowPosition = _mouseTop - _dialogTop + _arrowPositionAdjust;
                            _arrowMaxPosition = _dialogHeight - _arrowMaxPositionAdjust;
                            if (_arrowPosition > _arrowMaxPosition) {
                                _arrowPosition = _arrowMaxPosition;
                            }
                            $('.dialog-arrow', $dialogWrapper).css('margin-top', _arrowPosition);

                            //For all layers except modals
                        } else if ($modal === false) {

                            // Insert the arrow into the dialog
                            var _topAdjust = (_offsetTop - _currentScroll) - 51;
                            $this.dialog('option', 'position', [_left, _topAdjust]);

                        }

                    }

                },
                close: function() {
                    //Grab referrence to the top div for dialog
                    var $dialogWrapper = $(this).closest('.ui-dialog');

                    $('.ui-dialog-titlebar-close', $dialogWrapper).find('.ada-hidden').remove();
                    if ($returnFocusToLink.length && $returnFocusToLink.is(':visible')) {
                        $returnFocusToLink.focus();
                    }
                }
            }).dialog('open');

            //Remove role attribute to fix JAWs form issues
            $('#' + $id).parent().removeAttr("role");
            return false;
        })
        // Add stuff to each boa-action
        .each(function() {
            var $this = $(this);
            //Hover will activate click event
            if ($this.hasClass('boa-action-hover')) {

                $this.mouseover(function(ev) {
                    $this.click();
                });
            }
            // Add the dotted underline class to each of the boa-action links
            $this.addClass('dotted');
            //Add " Information Panel" to .boa-dialog links, unless it hasClass "no-ada-text"
            if (!$this.hasClass('no-ada-text')) {
                $this.append('<span class="boa-ada-text ada-hidden">&nbsp;layer</span>');
            }
        });
    }

    /* used in accordions to show/hide content within accordion sections */
    function toggleSetup() {
        $('.boa-toggle').each(function() {
            var $id = $(this).attr('rel');
            if (!$id) {
                return;
            }
            $(this).addClass('content-expand-link');
            $(this).click(function() {
                $('#' + $id).toggleClass('hidden');
                $(this).toggleClass('toggle-down');
                return false;
            });
        });
    }

    function printPage() {
        $('.print-page').each(function() {
            $(this).click(function() {
                window.print();
                return false;
            });
        });
    }

    function stateLicensePopupSetup() {
        $('a[name="state_license_information"]').click(function(ev) {
            var url = $(this).attr('href');
            return displayPopup(url);
        });
    }

    function linkStyling() {
        $(".guillemet").addClass("guillement-set");
        $('.style-link').each(function() {
            $a = $(this);

            switch (true) {
                case $a.hasClass('guillemet-right'):
                    $a.append("&nbsp;");

                    var newArrows = $('<span class="guillemet">&#8250;&#8250;</span>').appendTo($a),
                        arialTest = $('<span class="guillemet" style="font-family:Arial, Helvetica, sans-serif; visibilty:hidden; letter-spacing:-3px; ">&#8250;&#8250;</span>').appendTo($a),
                        franklinTest = $('<span class="guillemet" style="font-family: Franklin Gothic medium; visibilty:hidden; letter-spacing:-3px; ">&#8250;&#8250;</span>').appendTo($a);

                    if (newArrows.width() === arialTest.width() || newArrows.width() === franklinTest.width()) {
                        newArrows.addClass("ls-n1");
                    }
                    arialTest.remove();
                    franklinTest.remove();

                    break;

                case $a.hasClass('guillemet-left'):
                    $a.prepend("&nbsp;");
                    var newArrows = $('<span class="guillemet">&#8249;&#8249;</span>').prependTo($a),
                        arialTest = $('<span class="guillemet" style="font-family:Arial, Helvetica, sans-serif; visibilty:hidden; letter-spacing:-3px; ">&#8249;&#8249;</span>').prependTo($a),
                        franklinTest = $('<span class="guillemet" style="font-family: Franklin Gothic medium; visibilty:hidden; letter-spacing:-3px; ">&#8249;&#8249;</span>').prependTo($a);

                    if (newArrows.width() === arialTest.width() || newArrows.width() === franklinTest.width()) {
                        newArrows.addClass("ls-n1");
                    }
                    arialTest.remove();
                    franklinTest.remove();

                    break;

                    //Add interstitial/modal logic to this link
                case $a.hasClass('link-interstitial'):

                    var $this = $(this);
                    var thisID = $this.attr('id');
                    var thisTargetLang = $this.attr('data-target-language').toLowerCase();

                    //Add "language not available modal" if target link lang is different than current page lang.  Modal content will be dynamically set to global $boaLangObj
                    if (thisTargetLang && thisTargetLang !== $boaLangObj.boaLang) {

                        var $modalContent = '<div id="boaLangNotAvailableModalContent" class="hide"><h3 class="hide">' + $boaLangObj.langNotAvailable.title + '</h3><div class="flex-modal-main-content">' + $boaLangObj.langNotAvailable.content + '</div><div class="buttons-container" style="margin: 20px 0 10px 0"><a href="javascript:void(0);" class="btn-bofa btn-bofa-small btn-bofa-blue" id="continueLangNotAvailable"><span>' + $boaLangObj.langNotAvailable.continueBtn + '</span></a><a href="javascript:void(0);" class="btn-bofa btn-bofa-small" id="closeLangNotAvailableModal"><span>' + $boaLangObj.cancel + '</span></a><div class="clearboth"></div></div></div>';

                        //When link is activated, inject modal content, then trigger interstitial modal
                        $this.click(function() {
                            if ($('#boaLangNotAvailableModalContent').length === 0) {
                                $('body').append($modalContent);
                            }
                            $('#boaLangNotAvailableModalContent').boaFlexModal({
                                skin: 'modal-flex',
                                width: 600,
                                closeTriggers: $('#closeLangNotAvailableModal')
                            });
                            $('#continueLangNotAvailable').attr('href', $this.attr('href'));
                            return false;
                        });

                    }

                    break;

            }

        });

        /* adjust guillemet font size dynamically ls-n1 */
        $(".guillemet").not(".guillemet-set").each(function() {
            var guillemetFontSize = parseInt($(this).parent().css('font-size'));
            if (guillemetFontSize < 12) {
                $(this).addClass('f-11');
            }
            if (guillemetFontSize < 11) {
                $(this).addClass('ls-n2');
            }
        }).addClass("guillement-set");
    }

    function dartTagSetup() {
        // jQuery is loaded and is at least version 1.7.1
        if (boaVerCheck("1.7.1", "jquery")) {
            $("a.dart-click").on('click', function() {
                var $a = $(this),

                    source = $a.data('dart-src'),
                    type = $a.data('dart-type'),
                    category = $a.data('dart-cat'),
                    event = $a.data('dart-event-type'),

                    order = (event == "FireOnClickWithoutNumParam") ? false : true,
                    url = $a.data('dart-url');

                dartTag.fire({
                    "source": source,
                    "type": type,
                    "category": category,
                    "order": order,
                    "url": url
                });
            });
        }
    }

    /* Run init functions for each ".boa-module-init" module*/
    function boaModuleKickoff() {

        boaGlobalData = window.boaGlobalData || {};

        /*Inventory of modules that have been kicked off*/
        boaGlobalData.modulesInit = [];
        var $boaModules = $('.boa-module-init');
        $boaModules.each(function() {

            var $module = $(this);
            var moduleInit = $module.data('init');
            var moduleJS = $module.data('js') || "";
            var moduleCSS = $module.data('css') || "";
            var moduleView = $module.data('view') || "";
            var moduleInitOptions = "";

            try {
                moduleInitOptions = $module.data('options');

                if (typeof window[moduleInit] !== "undefined" && typeof window[moduleInit].init === "function") {
                    window[moduleInit].init(moduleInitOptions);
                }

                //Register with global object
                var m = {
                    "module": moduleInit,
                    "js": moduleJS,
                    "css": moduleCSS,
                    "rwdView": moduleView
                };

                boaGlobalData.modulesInit.push(m);

            } catch (e) { /*console.error(e);*/ }
        });
    };

    /*Add misc functions to Borneo pages*/
    function boaCommonSetup() {

        /*if we find page data, add to global settings.
		This is used to pull in CMS page params via Global FTL util
		This has to be done after doc.ready.*/
        if (typeof boaGlobalData !== "undefined" && typeof window.boaPageDataJS !== "undefined") {
            boaGlobalData.pageDataJS = $.extend({}, boaGlobalData.pageDataJS, window.boaPageDataJS);
        }

        /*Kickoff function for module inits*/
        boaModuleKickoff();

        /* btn-bofa auto-spacing helper:
         * Adds CSS class to last button among siblings and stand-alone buttons
         * to eliminate the default margin-right:15px applied to all buttons.
         *
         * Style is in global-designs.css.
         *
         * When upgrading jQuery to version 1.9+ you can make this more efficient
         * by using the :last-of-type selector
         */
        $('.btn-bofa').each(function() { //get all the buttons
            var $this = $(this); //jQueryize and store 'this'
            if (!$this.siblings('.btn-bofa').length) { //if the button doesn't have button siblings
                $this.addClass('btn-bofa-noRight'); //give it the class to eliminate the margins
            } else { //else, add the class to the last button in the group
                $this.parent().children('.btn-bofa:last').addClass('btn-bofa-noRight');
            } //ifelse
        }); //each


        /*Add close function to inline errors*/
        var $closeInlineMessage = $(".close-inline-message");
        if ($closeInlineMessage.length > 0) {
            $(".close-inline-message-link").click(function() {
                $(this).closest('.close-inline-message').hide();
            });
        }
        /*add alternating color rows to tables*/
        var $altTableRows = $(".table-vzd-alt-row table");
        if ($altTableRows.length > 0) {
            $('tr:nth-child(2n)', $altTableRows).addClass('alt-colored-tr');
        }
        /* adjust guillemet font size dynamically */
        var $guillemetFontAdjust = $(".guillemet");
        if ($guillemetFontAdjust.length > 0) {
            $guillemetFontAdjust.each(function() {
                var guillemetFontSize = parseInt($(this).parent().css('font-size'));
                if (guillemetFontSize < 12) {
                    $(this).addClass('f-11');
                }
                if (guillemetFontSize < 11) {
                    $(this).addClass('ls-n2');
                }
            });
        }

        $(".new-window-hover").hover(
            function() {
                $(this).children('img').addClass("d-inline");
            },
            function() {
                $(this).children('img').removeClass("d-inline");
            }
        );

        var $toggleInputs = $('input.toggle-input-value');
        if ($toggleInputs.length > 0) {
            $toggleInputs.focus(function() {
                // if the textbox is readonly, will not delete contents
                if ($(this).attr("readonly") != true) {
                    $(this).val('');
                }
            });
            $toggleInputs.blur(function() {
                if (($(this).val() === "") || ($(this).val() === " ")) {
                    $(this).val($(this).attr("title"));
                }
            });
        }

        /*  Fire Placeholder Attribute Plugin */
        if ($.isFunction(window.placeholder)) {
            $('input[placeholder], textarea[placeholder]').placeholder();
        }
    }

    return {
        // public
        init: init,
        jsSetup: jsSetup
    };
})();
boa.common.jsSetup();
jQuery(document).ready(boa.common.init);

/*
 * Custom jQuery Plugins
 *
 * Copyright Bank of America
 */
(function($) {
    jQuery.fn.boaAccordion = function(options) {
        var $accordion = $(this);
        options = jQuery.extend({
            showOnLoad: [0], // array of LI element(s) to show on load
            multipleOpen: false
        }, options);
        return $accordion.each(function() {
            if (options.multipleOpen) {
                $('div.content-area', $accordion).hide();
                $('a.heading', $accordion).click(function() {
                    $(this).next().toggle()
                        .end()
                        .find('span.title').toggleClass('active-state');
                    return false;
                });
                jQuery.each(options.showOnLoad, function() {
                    $accordion.children().eq(this)
                        .find('a.heading').trigger('click');
                    //.find('span.title').addClass('active-state');
                });
            } else {
                $accordion.accordion({
                    autoHeight: false
                });
                $accordion.accordion('activate', options.showOnLoad[0]);
                $accordion.children()
                    .eq(options.showOnLoad[0])
                    .find('span.title').addClass('active-state');
                $('.title', $accordion).click(function() {
                    $('span', $accordion).removeClass('active-state');
                    $(this).addClass('active-state');
                });
            }
        });
    };
})(jQuery);

(function($) {

    /*Ux Toolkit 3.0 Flex Modal*/
    jQuery.fn.boaFlexModal = function(options) {
        var returnFocusToLink;
        if (document.activeElement) {
            returnFocusToLink = document.activeElement;
        } else {
            returnFocusToLink = $('body');
        }
        var $modal = $(this);

        $boaLangObj = boaLangSetup();
        options = jQuery.extend({
            skin: 'modal-flex',
            width: 334,
            className: '',
            onOpen: function() {}, //callback for when the modal is opened.
            onClose: function() {}, //callback for when the modal is closed.
            closeTriggers: null, //$('#cancelFlexModalAlertLayer') pass in optional close links & buttons as jquery object
            closeOnEscape: true //whether to close the modal using Esc Key
        }, options);
        var modalClass = '';
        var modalSize = '';

        if (options.skin === 'modal-flex') {
            if (options.width > 580) {
                modalClass = 'modal-flex modal-flex-large';
            } else {
                modalClass = 'modal-flex';
            }

        } else if (options.skin === 'modal-flex-alert') {

            modalClass = 'modal-flex modal-flex-alert';

        }

        modalSize = options.width;
        modalClass += ' ' + options.className;

        //Add optional close links, buttons (pass in as jquery object);
        if (options.closeTriggers !== null && options.closeTriggers.length > 0) {

            $(options.closeTriggers).click(function() {
                $modal.dialog('close');
            });
        }

        return $modal.each(function() {
            $modal.dialog({
                modal: true,
                resizable: false,
                closeOnEscape: options.closeOnEscape,
                closeText: $boaLangObj.closeText,
                dialogClass: modalClass,
                width: modalSize,
                title: "\u00a0",
                open: function() {

                    var $modalParent = $modal.parent();

                    //Fix logic if opened multiple times
                    var modalFirstOpen = true;
                    if ($modalParent.hasClass('bac-dialog-open')) {
                        modalFirstOpen = false;
                    }

                    /**
                     * Logic for force focusing on the heading of the modal dialog to alert the ADA users
                     */

                    //Remove role, aria-live due to ADA defects
                    //ADA agreed that we should remove the role attribute on 09/17/12
                    //Add new attributes to the modal container
                    $modalParent
                        .removeAttr("role");

                    //Add new ID of "modal content ID + -ModalContainer" to modal parent div so we can target with CSS.
                    var modalContainerID = $modal.attr('id');
                    if (modalContainerID && modalContainerID.length > 0) {
                        $modalParent.attr('id', modalContainerID + '-ModalContainer');
                    }

                    //Find header in modal content and move the id tied to the labeledby attr
                    var $modalTitleLabeledBy = $modalParent.find('.ui-dialog-title');
                    var modalTitleLabeledByID = $modalTitleLabeledBy.attr('id');
                    var $modalTitle = null;
                    if ($modal.find('h2:first').length > 0) {
                        $modalTitle = $modal.find('h2:first');
                    } else if ($modal.find('h3:first').length > 0) {
                        $modalTitle = $modal.find('h3:first');
                    } else if ($modal.find('h4:first').length > 0) {
                        $modalTitle = $modal.find('h4:first');
                    }
                    if ($modalTitle !== null && $modalTitle.length > 0 && modalTitleLabeledByID && modalTitleLabeledByID.length > 0) {
                        $modalTitleLabeledBy.removeAttr('id');
                        $modalTitle.attr('id', modalTitleLabeledByID);
                    }
                    if ($modalParent.hasClass('modal-flex')) {
                        $modalParent.children();
                    }

                    //Add ADA text if it doesn't exist.  Note different versions of jquery handle opening the modal a 2nd time differently, so we have to add a 'bac-dialog-open' class to content that is dynamically added to determine if it already exists.

                    var $modalCloseLink = $modalParent.find('.ui-dialog-titlebar-close');
                    if ($modalCloseLink.find('.bac-dialog-open').length === 0) {

                        var closeADAText = $boaLangObj.layerClose;

                        if ($modalTitle !== null && $modalTitle.length > 0 && $modalTitle.text().length > 0) {
                            closeADAText += $boaLangObj.layerCloseSpacer + $modalTitle.text();
                        } else if ($modal.find('p').length > 0) {
                            closeADAText += $boaLangObj.layerCloseSpacer + $modal.find('p:first').text().substr(0, 50);
                        }

                        $modalCloseLink
                            .attr('id', modalContainerID + '-modalClose')
                            .removeAttr('role').removeAttr('title')
                            .append('<span class="ada-hidden bac-dialog-open">&nbsp; ' + closeADAText + '</span>')
                            .attr('href', 'javascript:void(0);');
							
						//To fix Close text issue in modals due to jquery-ui upgrade 1.12.1
						if (boaVerCheck("1.12.1", "jqueryui")) {
						$modalCloseLink.find('span.ui-icon-closethick').remove();
						$modalCloseLink.addClass('ui-state-default').append('<span class="ui-button-icon ui-icon ui-icon-closethick" style="display:inline-block"></span>');
						}
                      }
                    $modalCloseLink.focus();

                    if ($modal.find('.bac-ada-end').length === 0) {
                        $modal.append('<span class="bac-ada-end ada-hidden">End of layer.</span>');
                    }

                    //Last step in open fx, set flag that it has been opened before to prevent multiple logic.
                    $modalParent.addClass('bac-dialog-open');
                    //execute the callback for onOpen
                    if (options.onOpen !== null && $.isFunction(options.onOpen) === true) {
                        options.onOpen();
                    }

                },
                close: function() {
                    //execute the callback for onClose
                    if (options.onClose !== null && $.isFunction(options.onClose) === true) {
                        options.onClose();
                    }

                    if ($(returnFocusToLink).length && $(returnFocusToLink).is(':visible')) {
                        returnFocusToLink.focus();
                    }
                }
            }).dialog('open');
        });
    };


    /*Legacy BOA Modal Function*/
    jQuery.fn.boaModal = function(options) {
        var returnFocusToLink;
        if (document.activeElement) {
            returnFocusToLink = document.activeElement;
        } else {
            returnFocusToLink = $('body');
        }
        var $modal = $(this);
        $boaLangObj = boaLangSetup();
        options = jQuery.extend({
            size: 'small',
            width: 334,
            buttons: {
                'Cancel': false
            },
            className: 'custom-class',
            onOpen: null, // required. onOpen callback function
            callback: null, // required. function name to call when modal is closed
            focusCloseLink: true, //whether to focus on close link on dialog open
            closeOnEscape: true //whether to close the modal using Esc Key
        }, options);
        var focusCloseLink = options.focusCloseLink;
        var modalClass = '';
        var modalSize = '';
        if (options.size === 'small') {
            modalClass = 'custom modal';
            modalSize = options.width;
        } else if (options.size === 'med') {
            modalClass = 'custom modal modal-med';
            modalSize = 450;
        } else if (options.size === 'modal-500px') {
            modalClass = 'custom modal modal-500px';
            modalSize = 500;
        } else if (options.size === 'modal-500px-tall') {
            modalClass = 'custom modal modal-500px-tall';
            modalSize = 500;
        } else if (options.size === 'lg') {
            modalClass = 'custom modal modal-large ml-large'; // added for ML transfer-review modals
            modalSize = 520;
        } else if (options.size === 'custom') {
            modalClass = 'custom modal';
            modalSize = options.width;
        } else if (options.size === 'flex-width') {
            modalClass = 'modal-flex';
            modalSize = options.width;
        } else {
            modalClass = 'custom modal modal-large';
            modalSize = 742;
        }
        modalClass += ' ' + options.className;

        return $modal.each(function() {
            $modal.dialog({
                modal: true,
                bgiframe: true,
                resizable: false,
                closeOnEscape: options.closeOnEscape,
                closeText: $boaLangObj.closeText,
                dialogClass: modalClass,
                width: modalSize,
                open: function() {

                    var $modalParent = $modal.parent();

                    //Fix logic if opened multiple times
                    var modalFirstOpen = true;
                    if ($modalParent.hasClass('bac-dialog-open')) {
                        modalFirstOpen = false;
                    }

                    // Add the buttons and events if they have not already been added
                    if ($('div.buttons', $modal).length <= 0) {
                        var $dialog = $(this);
                        var $wrapper = $('<div class="buttons"></div>');
                        var $clearboth = $('<div class="clearboth"></div>');

                        $.each(options.buttons, function(i, val) {

                            //Translate button
                            if (i === "Continue") {
                                i = $boaLangObj.continueText;
                            } else if (i === "Cancel") {
                                i = $boaLangObj.cancel;
                            }

                            var nameAttr = "modalbtn_" + i.replace(/ /g, '');

                            //Set title text if its passed in
                            var buttonsAltText = "";
                            if (typeof(options.buttonsAltText) !== "undefined" && typeof(options.buttonsAltText[i]) !== "undefined" && options.buttonsAltText[i] !== "") {
                                buttonsAltText = 'title="' + options.buttonsAltText[i] + '" ';
                            }
                            var $button = $('<a href="javascript:void(0);" class="button-common button-gray mrt-15" name="' + nameAttr + '" ' + buttonsAltText + '><span>' + i + '</span></a>');

                            $button.click(function() {
                                $dialog.dialog('close');
                                options.callback(val);
                            });

                            //ADA: registering ENTER key event

                            $button.keypress(function(e) {
                                if (e.which === 13) {
                                    $dialog.dialog('close');
                                    options.callback(val);
                                }
                            });

                            $button.appendTo($wrapper);
                            $clearboth.appendTo($wrapper);
                        });
                        // looks for div.boa-modal-alert and inserts buttons inside that
                        // div, for layout reasons. otherwise, just append it to $modal
                        if ($('div.boa-modal-alert', $modal).length > 0) {
                            $wrapper.appendTo($('div.boa-modal-alert', $modal));
                        } else {
                            $wrapper.appendTo($modal);
                        }
                    }
                    /*
                     * Logic for force focusing on the heading of the modal dialog to alert the ADA users
                     * 1. Focus on #modal-heading if found
                     * 2  Focus on close link if indicated.  Most boaModals don't have close links
                     * 3  Focus on top of content
                     */

                    var $modalHeader = $modalParent.find("#modal-heading");

                    if ($modalHeader.length > 0) {
                        $modalHeader
                            .attr("tabIndex", 1)
                            .focus()
                            .css({
                                'outline': 'none'
                            });
                    } else if (focusCloseLink) {
                        $('.ui-dialog-titlebar-close:visible', $modalParent).removeAttr('role').removeAttr('title').focus();
                    } else {
                        $modal.attr("tabindex", 0);
                        $modal.focus();
                        $modal.css({
                            'outline': 'none'
                        });
                    }

                    //Remove role if modal contains a form
                    //ADA agreed that we should remove the role attribute on 09/17/12
                    $modalParent.removeAttr("role");

                    //Add new ID of "modal content ID + -ModalContainer" to modal parent div so we can target with CSS.
                    var modalContainerID = $modal.attr('id');
                    if (modalContainerID && modalContainerID.length > 0) {
                        $modalParent.attr('id', modalContainerID + '-ModalContainer');
                    }

                    //Find header in modal content and move the id tied to the labeledby attr
                    var $modalTitleLabeledBy = $modalParent.find('.ui-dialog-title');
                    var modalTitleLabeledByID = $modalTitleLabeledBy.attr('id');
                    var $modalTitle = null;

                    if ($modal.find('h2:first').length > 0) {
                        $modalTitle = $modal.find('h2:first');
                    } else if ($modal.find('h3:first').length > 0) {
                        $modalTitle = $modal.find('h3:first');
                    } else if ($modal.find('h4:first').length > 0) {
                        $modalTitle = $modal.find('h4:first');
                    }
                    if ($modalTitle !== null && $modalTitle.length > 0 && modalTitleLabeledByID && modalTitleLabeledByID.length > 0) {
                        $modalTitleLabeledBy.removeAttr('id');
                        $modalTitle.attr('id', modalTitleLabeledByID);
                    }

                    //ADA - Add title to close link
                    if (modalFirstOpen) {

                        var closeADAText = $boaLangObj.layerClose;

                        if ($modalTitle !== null && $modalTitle.length > 0 && $modalTitle.text().length > 0) {
                            closeADAText += $boaLangObj.layerCloseSpacer + $modalTitle.text();
                        } else if ($modal.find('p').length > 0) {
                            closeADAText += $boaLangObj.layerCloseSpacer + $modal.find('p:first').text().substr(0, 50);
                        }

                        $('.ui-dialog-titlebar-close', $modalParent)
                            .attr('id', modalContainerID + '-modalClose')
                            .removeAttr('role').removeAttr('title')
                            .attr('href', 'javascript:void(0);')
                            .append('<span class="ada-hidden">&nbsp; ' + closeADAText + '</span>')
                            .bind('mousedown click', function() {
                                /* Jquery UI 1.9.x interupts the first click of this with it's own mousedown.
								Setting this to mousedown so they both trigger. */
                                $modal.dialog('close');
                            });
                        $modal.append('<span class="boa-ada-end ada-hidden">End of layer.</span>');
                    }

                    //Last step in open fx, set flag that it has been opened before to prevent multiple logic.
                    $modalParent.addClass('bac-dialog-open');

                },
                close: function() {
                    if ($(returnFocusToLink).length && $(returnFocusToLink).is(':visible')) {
                        returnFocusToLink.focus();
                    }
                }
            }).dialog('open');

            if (options.onOpen !== null && $.isFunction(options.onOpen) === true) {
                options.onOpen();
            }
        });
    };
})(jQuery);

(function() {
    jQuery.fn.boaTooltip = function() {

        // if tooltip does not exist, create it and insert into body
        if (this.length > 0 && !$("#boaTooltip").length) {
            $("body").append("<div id='boaTooltip'><div id='boaTooltip-content'></div><div class='boaTooltip-bottom'></div></div>");
            $("#boaTooltip").css({
                top: -1000,
                left: -1000,
                position: 'absolute',
                zIndex: 100
            });
            $("body").append("<iframe id='boaTooltip_iframe' title='iFrame used for layout purposes' src='javascript:false;'></iframe>");
            $("#boaTooltip_iframe").css({
                top: -1000,
                left: -1000,
                position: 'absolute',
                zIndex: 50,
                opacity: 0
            });
        }
        return this.each(function() {
            $(this).mouseover(function() {
                var tooltip = $("#boaTooltip");
                // make sure the tooltip is off-screen
                tooltip.css({
                    top: -1000,
                    left: -1000
                });
                // empty the tooltip content
                $("#boaTooltip-content").empty();
                // grab the tooltip contents from the title attribute and remove the title
                boaTooltip_title = $(this).attr("title");
                $(this).attr("title", "");
                // populate the tooltip content
                $("#boaTooltip-content").append("<p>" + boaTooltip_title + "</p>");
                // get position
                var position = {
                    t: $(this).offset().top - (tooltip.height() + 20),
                    l: $(this).offset().left
                };
                // place the tooltip
                tooltip.css({
                    top: position.t,
                    left: position.l
                });
                // place and size the iframe for IE
                $("#boaTooltip_iframe").css({
                    top: position.t,
                    left: position.l,
                    height: tooltip.height(),
                    width: tooltip.width()
                });
            }).mouseout(function() {
                // take the tooltip and iframe off-screen
                $("#boaTooltip,#boaTooltip_iframe").css({
                    top: -1000,
                    left: -1000
                });
                // reset the element's title
                $(this).attr("title", boaTooltip_title);
            });

        });
    };
})(jQuery);

(function() {

    jQuery.fn.boaFormHelp = function() {

        if ($('#homepage-content').length > 0) {
            return;
            // if formhelp dialog does not exist, create it and insert into body
        } else if (!$("#boaFormHelp").length) {
            $("body").append("<div id='boaFormHelp' aria-live='rude'><div id='boaFormHelp-content'></div><div class='boaFormHelp-bottom'></div></div>");
            $("#boaFormHelp").css({
                top: -1000,
                left: -1000,
                position: 'absolute',
                zIndex: 100
            });
            $("body").append("<iframe id='boaFormHelp_iframe' title='iFrame used for layout purposes' src='javascript:false;'></iframe>");
            $("#boaFormHelp_iframe").css({
                top: -1000,
                left: -1000,
                position: 'absolute',
                zIndex: 50,
                opacity: 0
            });
        }
        return this.each(function() {
            $(this).focus(function() {

                var formhelp = $("#boaFormHelp");
                // make sure the formhelp is off-screen
                formhelp.css({
                    top: -1000,
                    left: -1000
                });
                // empty the formhelp content
                $("#boaFormHelp-content").empty();
                // grab the formhelp contents from a hidden DIV mapped to the field's ID
                var $id = $(this).attr('id');
                var $helpContent = $('#' + $id + '-formHelp').html();
                // populate the formhelp content
                $("#boaFormHelp-content").append($helpContent);
                // get position
                var position = {
                    t: $(this).offset().top - (formhelp.height() + 30),
                    l: $(this).offset().left + ($(this).width() / 2) - (formhelp.width() / 2)
                };
                // place the formhelp
                formhelp.css({
                    top: position.t,
                    left: position.l
                });
                // place and size the iframe for IE
                $("#boaFormHelp_iframe").css({
                    top: position.t,
                    left: position.l,
                    height: formhelp.height(),
                    width: formhelp.width()
                });
                //added to bring focus to the content.
                $("#boaFormHelp-content").focus();
            }).mouseout(function() {
                // take the formhelp and iframe off-screen
                //$("#boaFormHelp,#boaFormHelp_iframe").css({ top: -1000, left: -1000 });
            }).blur(function() {
                // take the formhelp and iframe off-screen
                $("#boaFormHelp,#boaFormHelp_iframe").css({
                    top: -1000,
                    left: -1000
                });
            });

        });
    };
})(jQuery);

(function() {
    jQuery.fn.boaInstructionalHelp = function() {

        // if instructionalhelp dialog does not exist, create it and insert into body
        if (this.length > 0 && !$("#boaInstructionalHelp").length) {
            $("body").append("<div id='boaInstructionalHelp'><div id='boaInstructionalHelp-content'></div><div class='boaInstructionalHelp-bottom'></div></div>");
            $("#boaInstructionalHelp").css({
                top: -1000,
                left: -1000,
                position: 'absolute',
                zIndex: 100
            });
            $("body").append("<iframe id='boaInstructionalHelp_iframe' title='iFrame used for layout purposes' src='javascript:false;'></iframe>");
            $("#boaInstructionalHelp_iframe").css({
                top: -1000,
                left: -1000,
                position: 'absolute',
                zIndex: 50,
                opacity: 0
            });
        }
        return this.each(function() {
            $(this).mouseover(function() {
                var instructionalhelp = $("#boaInstructionalHelp");
                // make sure the instructionalhelp is off-screen
                instructionalhelp.css({
                    top: -1000,
                    left: -1000
                });
                // empty the instructionalhelp content
                $("#boaInstructionalHelp-content").empty();
                // grab the instructionalhelp contents from a hidden DIV mapped to the elements's rel attribute
                // TO DO: make this more elegant
                var $id = $(this).attr('rel');
                var $instructionalHelpContent = $('#' + $id).html();
                // populate the instructionalhelp content
                var $closeButton = $('<div class="button-row"><a href="javascript:void(0);" class="button"><span>OK</span></a></div>');
                $("#boaInstructionalHelp-content").append($instructionalHelpContent).append($closeButton);
                // get position
                var position = {
                    t: $(this).offset().top - (instructionalhelp.height() + 30),
                    l: $(this).offset().left - (instructionalhelp.width() / 2) + 15
                };
                // place the instructionalhelp
                instructionalhelp.css({
                    top: position.t,
                    left: position.l
                });
                // place and size the iframe for IE
                $("#boaInstructionalHelp_iframe").css({
                    top: position.t,
                    left: position.l,
                    height: instructionalhelp.height(),
                    width: instructionalhelp.width()
                });
                // activate the close button
                $closeButton.click(function() {
                    // take the instructionalhelp and iframe off-screen
                    $("#boaInstructionalHelp,#boaInstructionalHelp_iframe").css({
                        top: -1000,
                        left: -1000
                    });
                    return false;
                });
            });
        });
    };
})(jQuery);

(function() {

    /*Add default show/hide function to all side-modules on page*/
    jQuery.fn.boaSideModule = function() {

        return this.each(function() {

            var $sideModule = $(this);
            $(".sm-title a", $sideModule).click(function() {

                if ($(this).hasClass("sm-show-title")) {
                    $(this).removeClass("sm-show-title").addClass("sm-hide-title");
                    $('.show-hide-text', $(this)).text($boaLangObj.hide);
                    $('.sm-topcontent-solidbtm', $sideModule).removeClass('hide');
                } else {
                    $(this).removeClass("sm-hide-title").addClass("sm-show-title");
                    $('.show-hide-text', $(this)).text($boaLangObj.show);
                    $('.sm-topcontent-solidbtm', $sideModule).addClass('hide');
                }
            });
        });
    };

    jQuery.fn.capsLockDetection = function() {
        if ($('#homepage-content').length > 0 || $(this).length == 0 || typeof document.msCapsLockWarningOff !== "undefined") {
            return;
        }
        // add in our div for caps lock detection display only if it does not exist
        if (!$("#boaCapsLockHelp").length) {
            $("body").append("<div id='boaCapsLockHelp' aria-live='rude' style='top: -1000px; left: -1000px; position: absolute; zIndex: 100;' class='hide'></div>");
        } //loop through each capslock-detect class and attach the keypress event for detection
        var $capsBubble = $("#boaCapsLockHelp");

        return this.each(function() {
            var $inputField = $(this);

            $inputField.keypress(function(e) {
                var keyCode = (e.keyCode ? e.keyCode : e.which);
                if ((keyCode >= 97 && keyCode <= 122) ||
                    (keyCode >= 65 && keyCode <= 90)) {
                    var shifton = false;
                    if (e.shiftKey)
                        shifton = e.shiftKey;
                    //show bubble only when caps lock is on and if letters are typed and shift is not pressed by the user else hide it
                    if ((keyCode >= 97 && keyCode <= 122 && shifton) || //shift true
                        (keyCode >= 65 && keyCode <= 90 && !shifton)) { //shift false
                        $capsBubble.empty().append($boaLangObj.capsLock);
                        var position = {
                            t: $inputField.offset().top - ($capsBubble.height() / 2) - 2,
                            l: $inputField.offset().left + ($inputField.width() + 18)
                        }
                        $capsBubble.removeClass('hide').css({
                            top: position.t,
                            left: position.l
                        })
                    } else {
                        $capsBubble.addClass('hide');
                    }
                } else {
                    $capsBubble.addClass('hide');
                }
            }).blur(function() {
                //hide bubble when user focuses out of the input box
                $capsBubble.addClass('hide');
            });
        });
    };

})(jQuery);

$(function() {

    /* 	Bind the boa-tooltiop, boa-formhelp, and boa-instructional classes
		to the appropriate popup dialog classes
	*/

    $('.boa-tooltip').boaTooltip();
    $('.boa-formhelp').boaFormHelp();
    $('.boa-instructional').boaInstructionalHelp();
    $('.side-module').boaSideModule();
    $('input.capslock-detect').capsLockDetection();
});

function windowSetup() {
    $('.boa-window').click(function(ev) {

        var options = new Object();

        /* proposed code added by NBK06TF 11/30/12 */
        $(this).addClass('force-visited');
        /* end proposed code  */

        var $classString = $(this).attr('class');

        // widths of window

        if ($classString.match('force-large') || $classString.match('force-xlarge')) {
            options.width = 800;
            options.height = 600;
        } else if ($classString.match('force-medium')) {
            options.width = 600;
            options.height = 400;
        } else if ($classString.match('force-small')) {
            options.width = 300;
            options.height = 200;
        } else {
            options.width = 200;
            options.height = 100;
        }

        var args = '';

        args += "height=" + options.height + ",";
        args += "width=" + options.width + ",";

        // Center window

        options.y = Math.floor((screen.availHeight - (options.height || screen.height)) / 2) - (screen.height - screen.availHeight);
        options.x = Math.floor((screen.availWidth - (options.width || screen.width)) / 2) - (screen.width - screen.availWidth);
        args += "screenx=" + options.x + ",";
        args += "screeny=" + options.y + ",";
        args += "left=" + options.x + ",";
        args += "top=" + options.y + ",";

        // Set default misc window options

        args += "status=0,";
        args += "scrollbars=1,";
        args += "menubar=0,";
        args += "location=0,";
        args += "resizable=1";

        var win = window.open(this.href, "wind", args);

        return false;

    });
}

function displayPopup(url) {
    var newWindow = window.open(url, 'boa_dialog_window', 'width=750,height=450,resizable,scrollbars');
    newWindow.focus();
    return false;
}

//Define for multilingual strings in js
function boaLangSetup() {

    var $boaLangObj = {};
    var lang = $("html").attr('lang').toLowerCase();

    if (lang == "es-us") {

        $boaLangObj = {

            boaLang: "es-us",
            closeText: "cerrar",
            show: "mostrar",
            hide: "cultar",
            continueText: "Continuar",
            cancel: "Cancelar",
            capsLock: "El Bloqueador de may&#250;sculas est&#225,activo",
            layerClose: " layer",
            layerCloseSpacer: ": ",
            langNotAvailable: {
                title: "La informaci&oacute;n Disponible en Ingl&eacute;s",
                content: "<p>La informaci&oacute;n que se encuentra a continuaci&oacute;n est&aacute; disponible s&oacute;lo en ingl&eacute;s en la actualidad.</p><p>Las solicitudes y los documentos asociados con productos y servicios espec&iacute;ficos podr&iacute;an estar disponibles s&oacute;lo en ingl&eacute;s. Antes de escoger un producto, por favor aseg&uacute;rese de haber le&iacute;do y entendido todos los t&eacute;rminos y condiciones provistas.</p><p>Seleccione Continuar en ingl&eacute;s para obtener m&aacute;s informaci&oacute;n.</p>",
                continueBtn: "Continuar en ingl&eacute;s"
            }

        };

    } else {

        $boaLangObj = {
            boaLang: "en-us",
            closeText: "close",
            show: "show",
            hide: "hide",
            continueText: "Continue",
            cancel: "Cancel",
            capsLock: "Caps lock is on",
            layerClose: " layer",
            layerCloseSpacer: ": ",
            langNotAvailable: {
                title: "Language Not Available",
                content: "<p>The information on this page is not available in English.</p><p>Applications and documents associated with specific products and services may not be available in your language. Before choosing a product, please ensure you have read and understood all terms and conditions provided.</p><p>Select Continue for more information.</p>",
                continueBtn: "Continue"
            }
        };
    }

    $boaLangObj.bankHolidays = ['01/01/2014', '01/20/2014', '02/17/2014', '05/26/2014', '07/04/2014', '09/01/2014', '10/13/2014', '11/11/2014', '11/27/2014', '12/25/2014', '01/01/2015', '01/01/2015', '01/19/2015', '02/16/2015', '05/25/2015', '07/03/2015', '09/07/2015', '10/12/2015', '11/11/2015', '11/26/2015', '12/25/2015'];

    return $boaLangObj;
}

//function to prevent back button
function boaLocationReplace(backURL) {
    if (document.images) {
        location.replace(backURL);
    } else {
        location.href = backURL;
    }
    return;
}

//function to set equal column height
//pass in jQuery object
function boaEqualHeight(group) {
    var tallest = 0;
    group.each(function() {
        var thisHeight = $(this).height();
        if (thisHeight > tallest) {
            tallest = thisHeight;
        }
    });
    group.height(tallest);
}

//function to set equal width
//pass in jQuery object
function boaEqualWidth(group) {
    var widest = 0;
    group.each(function() {
        var thisWidth = $(this).width();
        if (thisWidth > widest) {
            widest = thisWidth;
        }
    });
    group.width(widest);
}

//function to center an element in a container.
//Pass in jQuery object wth boaCenterAlign($('.cards-featured-module .side-well-skin .scard-refl'));
function boaCenterAlign(centerElement) {
    if (centerElement.length > 0) {
        var $hrzCenterThis = $(centerElement);
        var hrzCenterLeft = ((($hrzCenterThis.parent().innerWidth()) - ($hrzCenterThis.innerWidth())) / 2) - parseFloat($hrzCenterThis.parent().css('padding-left'));
        $hrzCenterThis.css('margin-left', hrzCenterLeft);
    }
}

//Function to vertical align text within an element $('.whatever').boaVertAlign();
$.fn.boaVertAlign = function() {
    return this.each(function(i) {
        var ah = $(this).height();
        var ph = $(this).parent().height();
        var mh = Math.ceil((ph - ah) / 2) - 1;
        $(this).css('margin-top', mh);
    });
};

/* Helper function to set CSS cardinal class markers on groups of elements
 */
$.fn.setFirstLastCount = function(options) {
    var settings = {
        node: "",
        container: "",
        label: "",

        filter: "*",
        exclude: ""
    };
    settings = $.extend({}, settings, options);

    var node = settings.node,
        label = settings.label,
        container = settings.container;

    if (!node || node == "") return;

    if (label == "") label = node.replace(/> |\s/g, '');

    $.each($(this).find(node), function() {
        if (container == "") {
            $(this).parent().addClass('setFirstLastCount');
        } else {
            $(container).addClass('setFirstLastCount');
        }
    });

    $('.setFirstLastCount').each(function(i) {
        var $container = $(this),
            $items = $container.find(settings.node).filter(settings.filter).not(settings.exclude),
            total = $items.length;

        $items
            .removeClass('first').removeClass('last')
            .each(function(j) {
                $(this)
                    .addClass((j == 0) ? label + '-first first' : '')
                    .addClass((j == (total - 1)) ? label + '-last last' : '')
                    .addClass(label + (j + 1))
                    .addClass((j % 2) ? 'even' : 'odd');
            });

    }).removeClass('setFirstLastCount')

    return this;
};


/*boaVerCheck will verify if the jQuery or jQuery UI version loaded on the page is at least as high as version string passed in
Returns true if loaded version is equal or higher
Returns false if version is lower or on error
Usage:
boaVerCheck("1.4.4","jquery"); 		//true if jquery version at least 1.4.4
boaVerCheck("1.10"); 				//true if jquery version at least 1.10
boaVerCheck("1.8.10","jqueryui");   //true if jquery ui version at least 1.8.10
*/
function boaVerCheck(requiredVersion, type) {

    try {

        //Check for valid required version format
        if (requiredVersion.match(/^(\d+).(\d+)/)) {
            //add third level of version .0 if missing for consistency
            if (!requiredVersion.match(/^(\d+).(\d+).(\d+)/)) {
                requiredVersion = requiredVersion + ".0";
            }
        } else {
            return false;
        }

        var reqVerSplit = splitVer(requiredVersion);

        //Get jquery or jquery ui version
        var loadedVer = (typeof type != "undefined" && type.length > 0 && type === "jqueryui") ? $.ui.version : $.fn.jquery;
        var loadedVerSplit = splitVer(loadedVer);

        //Check if major version is greater
        if (loadedVerSplit.major > reqVerSplit.major) {
            return true;
            //Or if others match, check if minor version is greater
        } else if ((loadedVerSplit.major === reqVerSplit.major) && (loadedVerSplit.minor > reqVerSplit.minor)) {
            return true;
            //Or if others match, check if release version is greater
        } else if ((loadedVerSplit.major === reqVerSplit.major) && (loadedVerSplit.minor === reqVerSplit.minor) && (loadedVerSplit.release >= reqVerSplit.release)) {
            return true;
        } else {
            return false;
        }

    } catch (err) {
        return false;

    }

    function splitVer(ver) {
        var matchV = ver.match(/^(\d+).(\d+).(\d+)/);
        if (matchV === null) {
            return matchV;
        }
        var v = {
            major: parseInt(matchV[1]),
            minor: parseInt(matchV[2]),
            release: parseInt(matchV[3]),
            build: parseInt(matchV[4])
        };

        return v;
    }
}

// jQuery plugin applies smooth scrolling to any internal link on the page (i.e. starts with "#") and has class "bofa-scroll"
// Optional data- parameters on the link include:
//
//	data-scroll-offset: How far away from the exact target should the scrolling stop? Pixels (-25).
//	data-scroll-speed: 	How fast should the scroll occur? Milliseconds (1000);
//	data-scroll-highlight: How long to keep the highlight class on the target? Milliseconds (10000).

$.fn.boaScroll = function(options) {
    var $scope = $(this),
        defaults = {
            scrollClass: "bofa-scroll",
            scrollHighlightOn: "bofa-scroll-active",
            scrollHighlightOff: "bofa-scroll-inactive",
            callback: null
        },
        required = {},
        settings = $.extend({}, defaults, options, required),
        s = settings,
        scrollTimeout;

    $.fn.toggleHighlight = function(status) {
        var on = (status == "on") ? s.scrollHighlightOn : s.scrollHighlightOff,
            off = (status == "on") ? s.scrollHighlightOff : s.scrollHighlightOn;

        clearTimeout(s.scrollTimeout);
        return $(this).removeClass(off).addClass(on);
    };

    return $('a[href*="#"]').filter('.' + s.scrollClass)
        .bind('click', function(e) {
            var $a = $(this),
                offset = $a.data('scroll-offset'),
                speed = $a.data('scroll-speed'),
                timeout = $a.data('scroll-highlight'),
                callback = $a.data('callback');

            $('.' + s.scrollHighlightOn).toggleHighlight('off');

            offset = (typeof offset == "number") ? offset : -25;
            speed = (typeof speed == "number") ? speed : 1000;
            timeout = (typeof timeout == "number") ? timeout : 10000;
            callback = (typeof callback !== "undefined") ? callback : settings.callback;

            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var $target = $(this.hash);
                $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');

                if ($target.length) {

                    var targetOffset = $target.offset().top + offset,
                        scrollElement = (typeof document.body.scrollTop === "number") ? 'body' : 'html';

                    $("html, body").animate({
                        scrollTop: targetOffset
                    }, speed, function() {
                        var component = $target.data('component'),
                            skin = $target.data('skin');

                        switch (component) {
                            case "module":
                                if (typeof skin != "string")
                                    $target = $target.find("[data-skin]");
                            case "skin":
                            default:
                                $target.toggleHighlight('on');
                                break;
                        };
                        if (timeout > 0) {
                            scrollTimeout = setTimeout(function() {
                                $target.toggleHighlight('off');
                            }, timeout);
                        }

                        // Callback if it exists, passing original event to callback
                        //
                        switch (typeof(callback)) {
                            case "function":
                                callback(e);
                                break;
                            case "string":
                                if (typeof window[callback] === "function") {
                                    window[callback](e);
                                }
                                break;
                        }

                    });
                    return false;
                }
            }
        });
};
$(function() {
    $('html').boaScroll();
});

//BOA field validation errors wrapper function to log Tea leaf events
function boaTLUIFieldValidationError(errorMsg) {

    var $errorMsg = errorMsg;
    var $type = "UIFieldValidationError";
    boaTLAddCustomEvent($errorMsg, $type);

    return;
}

//BOA Error wrapper function to log Tea leaf events
function boaTLAddCustomEvent(errorMsg, errorType, errorPage, errorObject) {

    if ((typeof TeaLeaf !== "undefined") && (typeof TeaLeaf.Event.tlAddCustomEvent !== "undefined")) {

        //Define error type "BOACustomError","UIAjaxError","UIFieldValidationError"
        var $errorType = "BOACustomError";
        if (typeof errorType !== "undefined" && errorType.length > 0) {
            $errorType = errorType;
        }

        //Define the  page
        var $errorPage;
        if (typeof errorPage !== "undefined" && errorPage.length > 0) {
            $errorPage = errorPage;
        } else {
            $errorPage = $('title').html();
        }

        var $errorMsg = errorMsg;
        var $errorObject = "";
        if (typeof errorObject !== "undefined" && typeof errorObject.message !== "undefined" && errorObject.message.length > 0) {
            $errorObject = errorObject.message;
        }

        //Create array to pass then pass to TL
        var $nVO = {
            Page: $errorPage,
            ErrorMessage: $errorMsg,
            BrowserException: $errorObject
        };
        TeaLeaf.Event.tlAddCustomEvent($errorType, $nVO);
    }
    return;
}

//BOA wrapper function to pass Tealeaf UI events that may not bubble up on their own.  This wrapper will prevent error on pages that don't have TL.
function boaTLAddEvent(event) {

    if ((typeof TeaLeaf !== "undefined") && (typeof TeaLeaf.Client.tlAddEvent !== "undefined")) {
        TeaLeaf.Client.tlAddEvent(event);
    }
    return;
}

var dartTag = function(options) {
    // No jquery, no DART
    if (!boaVerCheck("1.0", "jquery")) {
        return;
    }

    var defaults = {
            source: "",
            type: "",
            category: "",
            order: true,
            redirect: null
        },
        required = {
            container: "DART_OC_CONT",
            $container: $(),
            iframe: "DART_OC_IFRAME",
            url: "https://fls.doubleclick.net/activityi{{source}}{{type}}{{category}}{{ordnum}}{{random}}?"
        },
        settings = {},

        _createDartTag = function(options) {
            settings = $.extend(true, {}, defaults, options, required);
            settings.$container = $('#' + settings.container);

            var random = Math.floor(Math.random() * 999999),
                url = settings.url
                .replace('{{source}}', ';src=' + settings.source)
                .replace('{{type}}', ';type=' + settings.type)
                .replace('{{category}}', ';cat=' + settings.category)
                .replace('{{ordnum}}', settings.order ? ";ord=1;num=" : ";ord=")
                .replace('{{random}}', random)
                .replace(/\{\{.*\}\}/g, ''),

                $iframe = $('<iframe/>').attr('id', settings.iframe + '_' + random).attr('src', url),
                $dart = settings.$container.length > 0 ? settings.$container : $('<div id="' + settings.container + '" style="display:none;"></div>').appendTo("body");

            $dart.append($iframe);

            if (settings.redirect) {
                setTimeout("window.location.href = '" + settings.redirect + "';", 1000);
                return false;
            }
        };

    return {
        fire: _createDartTag
    };
}();

//DART Onclick Events
function dartFireOnClick(source, type, category) {
    dartTag.fire({
        "source": source,
        "type": type,
        "category": category
    });
}
//DART Onclick Events No "num" Param
function dartFireOnClickWithoutNumParam(source, type, category) {
    dartTag.fire({
        "source": source,
        "type": type,
        "category": category,
        "order": false
    });
}
//DART Onclick Events Special
function dartFireOnClickSpecial(source, type, category, href) {
    dartTag.fire({
        "source": source,
        "type": type,
        "category": category,
        "redirect": href
    });
}

//Show OBO Error message (used for OBO user on restricted links)
function boaOBORestricted(customErrorMessage) {
    var oboRestrictedErrorMsg = customErrorMessage || "You are restricted from viewing this content";
    var $messagingModule = $('.global-messaging-module');
    $('.page-error-skin .error-text', $messagingModule).each(function() {
        $(this).html(oboRestrictedErrorMsg);
        $messagingModule.show();
        $(this).css('width', $(this).closest('.global-messaging-module .page-error-skin').width() - 60).boaVertAlign();
    });
}

function asyncPrintCssInclude(path) {
    $('<link>', {
        rel: 'stylesheet',
        type: 'text/css',
        media: 'print',
        href: path
    }).appendTo('head');
}

//Get cookie function
function boaGetCookie(name) {
    var search = name + "=";
    var returnvalue = "";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1)
                end = document.cookie.length;
            returnvalue = unescape(document.cookie.substring(offset, end));
        }
    }
    return returnvalue;
}

//Set cookie function
function boaSetCookie(name, value, days, domain) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else {
        var expires = "";
    }

    var domainStr = (domain ? ";domain=.bankofamerica.com" : "");
    document.cookie = name + "=" + value + expires + domainStr + "; path=/";
}

//Get URL paramter: name.  Returns param value or null.
function boaGetUrlParam(name) {
    try {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        } else {
            return decodeURIComponent(results[1]) || null;
        }
    } catch (e) {
        return null;
    }
}

/* jQuery Plugin: CSS3 PIE Loader removed 2/2014 so providing default stub */
jQuery.fn.pie = function() {
    return this;
};


/* Custom select code: selectBofa */
var selectBofa = function($, selector) {
    var $this, tempShim, tempPosition, tempWidth, tempData, shimHolder, //setup reusable vars
        DEBUGMODE = false, //turn on or off global debugging
        debugOn = false, //don't edit this
        ns = 'selectBofa', //setup namespace for data and event handlers
        globalSelects, //will contain jQued collection of select-bofa elements
        init = function() { //initialize data and listeners on each element
            var $selects = $(selector),
                runThis = ($selects.length && $.browser.msie && $.browser.version < 9), //save conditional killswitch (IE8- and select-bofa elements on page)
                globalSelects = $selects; //save reference to $selects in global var
            //if killswitch false, don't run init
            if (!runThis) return debug('selectBofa.init did not run because either there are no &lt;select&gt; items or the browser is not IE8-');
            debug('selectBofa.init ran');
            $selects.each(function(i) { //iterate over each select-bofa
                $this = $(this);
                debug('=======================| select-bofa: ' + i + ' |==================\n\rRUNS IF true/undefined. fxWdth: ' + !$this.hasClass('select-bofa-fxWdth') + ' | initialized: ' + hasBeenInitialized($this));
                if (!$this.hasClass('select-bofa-fxWdth') && !hasBeenInitialized($this)) { //if not fixed-width and not initialized yet
                    setData($this); //setup data to store original widht
                    tempPosition = $this.position(); //save position before inserting shim
                    shim($this); //create shim to hold positioning
                    position($this, tempPosition); //reposition select-bofa absolute
                    setEventHandlers($this); //setup eventhandlers
                    debug('after setData, shim, position and setEventHanlders data(ns):');
                    debug($this.data(ns));
                }
            });
        },
        destroy = function($objs) { //remove and clean up from select-bofa elements
            $(window).unbind('.' + ns); //unbind events
            $objs.parent('.select-bofa-shim').remove(); //remove shims
            $objs.removeData(ns); //remove data
            $objs.remove(); //remove select-bofas
            debug("Select-bofas destroyed: " + $objs.length);
        },
        disable = function($objs) {
            $($objs).unbind('.' + ns); //unbind events
            $objs.parent('.select-bofa-shim').map(function() { //remove shims, but keep <select>
                $this = $(this);
                $this.replaceWith($this.contents());
            });
            $objs.each(function() { //put <select> back to original styles
                $this = $(this);
                tempData = $this.data(ns); //get styles from data stored on element
                if (tempData) {
                    $this.css({
                        'position': tempData.position,
                        'top': tempData.top,
                        'left': tempData.left,
                        'zIndex': tempData.zIndex
                    });
                }
            });
            $objs.removeData(ns); //remove data
            debug($objs.length + ' select-bofa(s) returned to ordinary &lt;select&gt; menus.');
        },
        setData = function($obj) { //save original width and style info to data
            $obj.data(ns, {
                origWidth: outerWidth($obj, false),
                position: $obj.css('position'),
                top: $obj.css('top'),
                left: $obj.css('left'),
                zIndex: $obj.css('zIndex')
            });
            debug('setData ran. origWidth: ' + $obj.data(ns).origWidth);
        },
        setEventHandlers = function($obj) { //set event handlers to activate change in width
            debug('setEventHandlers ran: ' + $obj.attr('class'));
            $obj.bind('mousedown.' + ns + ' focus.' + ns, function(e) { //for mousedown and focus events
                $this = $(this);
                tempWidth = $this.data(ns).origWidth;
                debug('BEFORE: ' + e.type + ' event. Current Width: ' + $this.css('width') + ' | origWidth: ' + tempWidth);
                if (parseInt($this.css('width')) > tempWidth && e.type !== 'focus') { //if current width is bigger than original width and it's not a focus event (aka, clicking on the same option that's already selected)
                    setTimeout(function() {
                        $this.css('width', tempWidth)
                    }, 150); //use timeout to work around IE bug, put width back to original width
                    debug('Alternative ' + e.type + ' event.');
                } else {
                    $this.css('width', 'auto'); //else, this <select> is closed, so expand to full width
                }
                debug('AFTER: ' + e.type + ' event. Current Width: ' + $this.css('width') + ' | origWidth: ' + tempWidth + '\n==========');
            }).bind('blur.' + ns + ' change.' + ns, function(e) { //for blur and change events
                debug(e.type + ' event. Return width to data.origWidth: ' + $this.data(ns).origWidth);
                $this = $(this);
                $this.removeClass("w-auto");
                $this.css('width', $this.data(ns).origWidth); //set width back to original
            });
        },
        position = function($obj, pos) { //take select-bofa out of the documents flow to prevent disruption when the width is expanded
            debug('position ran');
            tempPosition = (pos) ? pos : $obj.position(); //either use the position from the argument, or get a new position from the element
            var z = $obj.css('z-index');
            $obj.css({ //make .select-bofa absolute to not affect positioning
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'z-index': (z !== 'auto') ? z + 1 : 1
            });
        },
        shim = function($obj) { //make shim to retain inline spacing and contain select-bofa. Style it to mimick original <select>
            debug('shim ran');
            var z = $obj.css('z-index');
            shimHolder = $('<span class="select-bofa-shim"/>').css({
                'height': $obj.outerHeight(true),
                'width': outerWidth($obj, true),
                'position': ($obj.css('position') === 'static') ? 'relative' : $obj.css('position'),
                'display': $obj.css('display'),
                'float': $obj.css('float'),
                'top': $obj.css('top'),
                'left': $obj.css('left'),
                'z-index': (z !== 'auto') ? z + 1 : 1,
                'verticalAlign': 'middle'
            });
            $.extend($obj.data(ns), {
                shim: shimHolder
            }); //extend objects data to hold reference to shim
            $obj.wrap(shimHolder); //wrap select object in shim
        },
        hasBeenInitialized = function($obj) { //check to see if element has already been initialized
            return $obj.data(ns);
        },
        outerWidth = function($obj, margins) { //utility to help IE which has width of zero if element is display:none
            return $obj.outerWidth(margins) || function($obj, margins) { //return width if not zero, or calculate width from dummy element
                $dummy = $obj.clone().css('visiblity', 'hidden'); //create dummy from clone of <select> and hide it
                $('body').append($dummy); //place the dummy into the page
                var width = $dummy.outerWidth(margins); //get dummy's width
                $dummy.remove(); //remove dummy
                return width; //return width
            }($obj, margins);
        },
        debug = function(msg) { //debug helper that can easily be turned off for production
            if (!DEBUGMODE) return false;
            console.log(msg);
            var $debug = $('#debug');
            $debug.append('<p>&bull;&nbsp;&nbsp;' + msg + '</p>');
            if (!debugOn) {
                $debug.prepend('<h2>Debugging On. Check Console:</h2>');
                $debug.fadeIn(500);
                debugOn = true;
                clearTimeout(debugOff);
                var debugOff = setTimeout(function() {
                    $debug.fadeOut(500, function() {
                        $debug.empty()
                    });
                    debugOn = false;
                }, 10000);
            }
        },
        setDebugMode = function(t) { //set whether debug mode is on or off
            if (!t) debug('Debugging disabled');
            DEBUGMODE = t;
        },
        getDebugMode = function() { //get current value of debug mode
            return DEBUGMODE;
        };

    return { //make some functions publicly available
        init: init,
        destroy: destroy,
        disable: disable,
        getDebugMode: getDebugMode,
        debug: debug,
        setDebugMode: setDebugMode
    }

}(jQuery, '.select-bofa'); //selectBofa receives jQuery and selector to target

$(document).ready(selectBofa.init); //do the deed




var cfLoader = (function($) {

    //PRIVATE VARS
    var debugMode = false, //global debug switch, should be false for production
        fontNames = [], //array to hold list of currently loading font names
        loadedFontNames = [], //aray to hold all loaded font names
        $blankTestDiv, //div that is cloned for each font test, blank to start
        blankTestDivStatus, //tracks state of blankTestDiv: 1 = inserted into DOM, 2 = <body> is ready
        timers = {}, //object to hold all _test timers
        timerId = 0, //ensure uniqueness of all _test timers
        $html, //will hold jQueried html element
        loading = '-loading', //string to build into CSS class for loading status
        active = '-active', //string to build into CSS class for active status (success)
        inactive = '-inactive', //string to build into CSS class for inactive status (fail)
        callback; //if callback function passed to init, it will be stored here

    //PUBLIC VARS
    var settings = {
        namespace: 'cf-',
        maxLoadTime: 5000,
        testFrequency: 100,
        path: "/pa/global-assets/1.0/font/{f}/{f}",
        fontStyle: "@font-face { font-family: '{f}'; src: url('{p}.eot'); src: url('{p}.eot?#iefix') format('embedded-opentype'), url('{p}.woff') format('woff'), url('{p}.ttf') format('truetype'); font-weight: normal; font-style: normal; font-variant: normal; }"
    };

    //PRIVATE FUNCTIONS
    var _debug = function(msg) { //DEBUG FUNCTION WITH GLOBAL ON/OFF SWITCH
            if (debugMode == true) console.log(msg);
        },
        _contains = function(needle, haystack) { //RETURNS BOOLEAN FOR WHETHER SUBSTRING IS IN STRING
            return haystack && ~haystack.indexOf(needle);
        },
        _isUniqueItem = function(item, array) { //TEST TO SEE IF ITEM IS ALREADY IN ARRAY
            var l = array.length;
            _debug('_isUniqueItem | called with item: ' + item + ' and array: ' + ((array.length) ? array.join() : 'empty array'));
            for (var i = 0; i < l; i++) {
                if (item == array[i]) {
                    return false;
                }
            }
            _debug('_isUniqueItem | font ' + item + ' is unique. Return true: add it to list');
            return true;
        },
        _timeNow = function() { //RETURNS CURRENT TIME
            return new Date().getTime();
        },
        _test = function(test, callback, frequency, timeout) { //UTILITY FUNCTION FOR RUNNING ANY TEST UNITL TRUE OR TIMEOUT
            var id = timerId++, //increment id to ensure unique instance
                start = _timeNow(), //get current time
                time,
                isTimeout = false;
            frequency = frequency || 1; //IE needs minimum 1ms for setInterval

            timers[id] = setInterval(function() {
                time = _timeNow() - start; //get time passed since start
                if (test() || (timeout && (isTimeout = time > timeout))) { //if test is true or timeout set and time passed is more than allowe time-to-test
                    callback.call(window, isTimeout, time); //activate callback function
                    clearInterval(timers[id]); //clear this setInterval
                }
            }, frequency);
        },
        _buildFontNames = function() { //BUILD LIST OF FONT NAMES
            if (!fontNames.length) { //if no fonts sent
                var font;
                $('[data-font]').not('[data-font="#!"]').each(function() { //scan DOM for elements with "data-font" attribute
                    var $this = $(this);
                    font = $this.data('font'); //get font name from data-font
                    $this.attr('data-font', '#!').addClass(font); //mark as being loaded and set class name
                    _debug("_buildFontNames | font to build: " + font);
                    if (_isUniqueItem(font, fontNames) && _isUniqueItem(settings.namespace + font, loadedFontNames)) //if not already saved for loading & not already loaded
                        fontNames = fontNames.concat([font]); //add font name to load list
                });
                _debug('_buildFontNames | List of font names after unique filter: ' + fontNames.join());
            }
        },
        _createBlankDiv = function() { //CREATE BLANK TESTER DIV AND MANAGE IT
            //if blank tester <div> doesn't exist, create it
            if (!$blankTestDiv) $blankTestDiv = $('<div aria-hidden=\"true\" style=\"position:absolute;top:-999em;left:-999em;width:auto;font-size:300px;font-family:serif\">BlankTestESs</div>');

            if (!blankTestDivStatus) { //if the blankTestDiv has no status, aka, the first time this script runs
                $blankTestDiv.appendTo(document.documentElement); //append it do DOM
                blankTestDivStatus = 1; //update its status to created (1)

                _debug("_createBlankDiv | baseline width of $blankTestDiv to compare against: " + $blankTestDiv.width());
                if (!$blankTestDiv.width()) { //if width is zero, it's IE6 or 7, need to wait for presence of <body>
                    _test(function() { //test for presence of <body>, and when ready...
                        return document.body;
                    }, function() {
                        $blankTestDiv.appendTo('body'); //append blankTestDiv to <body>
                        blankTestDivStatus = 2; //update blankTestDiv status to ready (2)
                        _debug('_createBlankDiv | IE6/7 div inserted into <body> after _testing. $blankTestDiv.width(): ' + $blankTestDiv.width());
                    }, settings.testFrequency);
                } else { //else, set blankTestDiv status to ready (2)
                    blankTestDivStatus = 2;
                }
            }
        },
        _buildFonts = function() { //TAKE FONT ARRAY AND PREPARE FOR FONT TESTS AND FONT LOADING
            var l = fontNames.length, //number of fonts to load
                fontName, //will hold each individual font name
                fontTemplate = /\{f\}/g, //search string to create font name string
                fontPath, //will hold path to each font
                pathTemplate = /\{p\}/g, //search string to create font path
                fontStyle, //will hold each font's complete style rule
                fontCSS = [], //will hold array of all font style declarations
                namespacedFontName, //will hold each font's special namespaced string
                $testDiv; //will hold each font's styled testing <div>
            $html = $('html');

            for (var i = 0; i < l; i++) { //for each font name
                fontName = fontNames[i].toLowerCase(); //lowercase font name
                fontPath = settings.path.replace(fontTemplate, fontName); //build filepath to font
                fontStyle = settings.fontStyle.replace(fontTemplate, fontName).replace(pathTemplate, fontPath); //build font-face style declaration
                fontCSS.push(fontStyle); //add this font's style to the CSS that will be output
                $testDiv = $blankTestDiv.clone().css({
                    'font-family': '"' + fontName + '", serif'
                }); //clone blank test <div> and style it for this font
                namespacedFontName = settings.namespace + fontName; //build namespaced font-specific string for tagging stuff
                $html.addClass(namespacedFontName + loading); //tag <html> as loading status for font
                _canWeTestFont($testDiv, namespacedFontName); //begin monitoring when we can test the font's loading status
            }
            return fontCSS;
        },
        _canWeTestFont = function($testDiv, namespacedFontName) { //CHECK IF blankTestDiv IS INSERTD INTO BODY/DOC AND READY FOR TESTING
            if (blankTestDivStatus === 2) { //if the blankTestDiv is ready, procede with testing
                _testTheFont($testDiv, namespacedFontName);
            } else { //else, check repeatedly until it is ready testing
                _test(function() {
                    return blankTestDivStatus === 2;
                }, function() {
                    _testTheFont($testDiv, namespacedFontName); //then procede with testing
                }, settings.testFrequency);
            }
        },
        _testTheFont = function($testDiv, namespacedFontName) { //TESTS TO SEE WHEN EACH FONT IS LOADED, AND REACTS ACCORDINGLY
            _debug('_testTheFont | <body> element exists, and $blankTestDiv inserted into DOM. \nTesting of the font-face-styled div has started for: ' + namespacedFontName);
            _debug($testDiv);
            $testDiv.appendTo('body'); //insert font-face-styled testing <div> into document

            _test(function() { //_test over and over again comparing widths or blank to font-styled <div>s
                _debug('_testTheFont | testing ' + namespacedFontName + ': $blankTestDiv.width() ' + $blankTestDiv.width() + ' compared to $testDiv.width(): ' + $testDiv.width());
                return $blankTestDiv.width() !== $testDiv.width(); //test to see if original blank tester <div> no longer has same width as font-face-styled testing <div>, which means font has loaded
            }, function(timeout) {
                if (timeout) { //if callback is due to timeout, not successful font load
                    $html.removeClass(namespacedFontName + loading); //remove loading class
                    $html.addClass(namespacedFontName + inactive); //add inactive class (fail)
                    _debug('_testTheFont | timeout occurred for: ' + namespacedFontName);
                } else { //else, font loaded successfully
                    $html.removeClass(namespacedFontName + loading); //remove loading class
                    $html.addClass(namespacedFontName + active); //add active class (success)
                    _debug('_testTheFont | successful load detected for: ' + namespacedFontName);
                    loadedFontNames.push(namespacedFontName); //save namespaced font name to list of already loaded fonts
                    _debug('_testTheFont | loadedFontNames: ' + loadedFontNames.join());
                }
                if (callback) { //if there was a callback created during init
                    callback(namespacedFontName, timeout) //call the callback
                }
            }, settings.testFrequency, settings.maxLoadTime); //settings for _test: how often to test, how long before timeout
        },
        _loadFonts = function(cssArray) { //CREATES AND INSERTS <style>@font-face RULES</style> INTO <head>
            _debug('_loadFonts | received array from _buildFonts and then inserts into DOM as <style>. The output of array is below:')
            _debug(cssArray.join('\n\n'));

            var style = document.createElement('style'), //make <style>
                text,
                head = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
                css = cssArray.join(''); //build style rules to go inside <style>

            style.setAttribute('type', 'text/css'); //set type attribute for xhtml doctype/IE7
            head.insertBefore(style, head.firstChild); //insert <style> into head - must be before text insertion for IE

            if (style.styleSheet) { //for IE, add style rules to <style>
                try { //catch any errors: Looking at you IE9
                    style.styleSheet.cssText = css; //add style rules
                } catch (e) { //if error
                    var namespacedFontName;
                    while (fontNames.length) { //iterate through fontNames to be loaded
                        namespacedFontName = settings.namespace + fontNames.pop(); //create namespaced font name
                        $html.removeClass(namespacedFontName + loading); //remove loading class
                        $html.addClass(namespacedFontName + inactive); //add inactive class (fail)
                    }
                }
            } else { //for all others, add style rules to <style>
                text = document.createTextNode(css);
                style.appendChild(text);
            }
            _debug(style);
        }


    //PUBLIC METHOD
    var init = function() { //publicly reachable API
            var l = arguments.length;
            _debug('init | init called with ' + l + ' arguments.');
            if (l) { //if there are arguments
                for (var i = 0; i < l; i++) { //else, itterate through arguments and do stuff
                    if (_contains('rray', arguments[i].constructor.toString())) { //if argument is array
                        fontNames = arguments[i]; //argument contains list of fonts to load
                        _debug('init | array passed as argument index ' + i + ': ' + fontNames.join(''));
                    } else if (typeof arguments[i] === 'object') { //if argument is object, and not array
                        $.extend(settings, arguments[i]); //extend options with argument
                        _debug('init | object passed as argument index' + i + ': ' + ((typeof JSON !== 'undefined') ? JSON.stringify(arguments[i]) : arguments[i]));
                    } else if (typeof arguments[i] === 'function') { //if argument is function
                        callback = arguments[i]; //asign it as callback
                        _debug('init | callback function passed as argument index ' + i + ': ' + arguments[i].toString());
                    } else { //else, invalid argument, throw error
                        throw new Error('cfLoader.init(): You passed an argument that is not supported. Please use:\nAn Object containing settings or\nAn array containing font names or\nA callback function');
                    }
                }
            }
            conductor(); //run font-loader
        },
        conductor = function() { //ORCHESTRATES AND STARTS ALL THE GOOD STUFF
            _debug('conductor | initialized with fontNames: ' + ((fontNames.length) ? fontNames : 'empty array'));
            _buildFontNames(); //build array of font names, saved to global var fontNames
            if (jQuery.fn.jquery == "1.3.2") return $('html').addClass('cf-force-show-crowbar'); //if dependency library not available, force show and stop running.
            if (!fontNames.length) return; //if there are no fonts to load, stop.
            _createBlankDiv(); //create and insert into DOM the default, baseline <div> that will be tested against
            var fontCSSArray = _buildFonts(); //prepare for font testing and font loading
            _loadFonts(fontCSSArray); //load the font files via injecting inline <style> containing @font-face declarations
            fontNames = []; //reset global variable that did hold all font names to load
        }

    //RETURN PUBLIC API
    return {
        init: init,
        refresh: conductor
    }
})(jQuery);

$(cfLoader.init); //initialize on document.ready

/*BofA Browser Detection function
Handles all desktop browser and mobile OS/browser detection
Browser CSS classes and mobile phone # formatting*/
var boaBrowserDetect = function($) {

    //global browser obj
    window.boaBrowserObject = {};
    var defaults = {
            "userAgent": null,
            "showMessage": true, // turn off message
            "debug": false, // enable debugging
            "testMode": false, //test mode; turns on messaging on command
            "isLocal": (window.location.protocol == "file:" || /(localhost|uxdesign)/.test(window.location.hostname)),
            "useSessionStorage": (window.sessionStorage ? true : false), //Is Session Storage Available
            "ua": "",
            "platform": "",
            "boaBrowserShowNoticeCookie": "",
            "boaBrowserTestCookie": "",
            "getCmsBrowserFile": false
        },
        settings = {},

        /* Init function - Call with boaBrowserDetect.init(options);*/
        _initialize = function(options) {

            try {

                settings = $.extend({}, defaults, options);

                _debug("boaBrowserDetect: begin boaBrowserDetect init");

                //Accept user agent for testing, or get property from browser.  If ua was passed in (debug mode), disable caching
                settings.useSessionStorage = settings.userAgent ? false : settings.useSessionStorage;
                settings.ua = settings.userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : '');
                settings.platform = (typeof navigator !== 'undefined' ? navigator.platform : '');
                settings.boaBrowserShowNoticeCookie = boaGetCookie("boaBrowserShowNotice");

                //Enable Test mode for dev by setting cookie, or settings.testMode=true
                settings.boaBrowserTestCookie = boaGetCookie("boaBrowserTest");

                if (settings.boaBrowserTestCookie == "true") {
                    settings.testMode = true;
                }

                /*if testMode is on, check for cookie that enables browser msg, disable session storage.*/
                if (settings.testMode) {
                    settings.debug = true; //enable debug
                    settings.showMessage = true; //show message on all pages
                    settings.useSessionStorage = false; //don't use session storage
                    _debug('boaBrowserDetect: testMode is: ' + settings.testMode);
                }

                //Check local storage first
                boaBrowserObject = _boaBrowserGetSessionStorage();

                //if browser obj found in localsession, just show message
                if (boaBrowserObject && boaBrowserObject.browserSupport) {

                    //show browser message after doc ready.
                    _boaBrowserShowMessage();

                    //alert other code that browser object is available
                    boaBrowserObject.loaded = true;
                    $(document).trigger('boaBrowserObjectLoaded');


                    //Not in session, create fresh browser object
                } else {

                    //Define Default Browser Object
                    var boaBrowserDefault = _boaBrowserGetDefaultObj();

                    //Run bowser detection
                    var bowser = _bowserUtil(settings.ua);

                    //merge bowser result with default browser object
                    boaBrowserObject = $.extend(true, boaBrowserDefault, bowser);

                    //Add system check data
                    _boaBrowserSystemCheck();

                    //Add plugin check data
                    _boaBrowserPluginCheck();

                    //Browser Messaging Rules

                    //If using CMS file, get dynamic content then run browser rules:
                    if (settings.getCmsBrowserFile) {

                        _boaBrowserUpdateMessageData();

                        //Run default browser rules
                    } else {
                        //Run rules for this browser
                        _boaBrowserProcessRules();

                        //save obj to session storage
                        _boaBrowserSetSessionStorage();

                        //alert other code that browser object is available
                        boaBrowserObject.loaded = true;
                        $(document).trigger('boaBrowserObjectLoaded');
                    }
                }

            } catch (e) {
                _debug('boaBrowserDetect: _initialize error: ' + e);
            };

            /*Do Browser specific tasks on DOM Ready*/
            $(document).ready(function() {

                try {

                    //add browser css classes to the html element
                    _setBrowserCSS();
                    //set any mobile phone #s
                    _formatMobilePhoneNum();

                } catch (e) {
                    _debug('boaBrowserDetect: _initialize error: ' + e);
                };
            });
            //Run debugging mode
            if (boaBrowserObject.debug && typeof boaBrowserDebug === "function") {

                try {
                    setTimeout(function() {
                        boaBrowserDebug();
                    }, 1000);
                } catch (e) {
                    _debug('boaBrowserDetect: _initialize error: ' + e);
                };
            }

            _debug("boaBrowserDetect: end boaBrowserDetect init");

        },

        /* Hide Browser Alert function*/
        _hideBrowserAlert = function() {
            _debug('begin _hideBrowserAlert()');
            settings.showMessage = false;
        },
        /* Debug function*/
        _debug = function(msg) {
            if (window.console && settings.debug) {
                console.log(msg);
            }
        },
        /*Start Bowser detect function.
         * Bowser is a stand along utility providing browser & mobile device detection.  If bowswer is updated with new code, it can easily be swapped out in bowserUtil without affecting any other logic*/
        _bowserUtil = function(ua) {
            /*!
             * Bowser - a browser detector
             * https://github.com/ded/bowser
             * MIT License | (c) Dustin Diaz 2014
             */

            var t = true;

            function detect(ua) {

                function getFirstMatch(regex) {
                    var match = ua.match(regex);
                    return (match && match.length > 1 && match[1]) || '';
                }

                var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase(),
                    likeAndroid = /like android/i.test(ua),
                    android = !likeAndroid && /android/i.test(ua),
                    versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i),
                    tablet = /tablet/i.test(ua),
                    mobile = !tablet && /[^-]mobi/i.test(ua),
                    result;

                if (/opera|opr/i.test(ua)) {
                    result = {
                        name: 'Opera',
                        opera: t,
                        version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
                    };
                } else if (/windows phone/i.test(ua)) {
                    result = {
                        name: 'Windows Phone',
                        vendor: 'Microsoft',
                        windowsphone: t,
                        msie: t,
                        version: getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
                    };
                } else if (/maxthon/i.test(ua)) {
                    result = {
                        name: 'Maxthon',
                        maxthon: t,
                        version: getFirstMatch(/maxthon\/(\d+(\.\d+)?)/i)
                    };
                } else if (/edge/i.test(ua)) {
                    result = {
                        name: ' Edge',
                        vendor: 'Microsoft',
                        msie: t,
                        edge: t,
                        version: getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
                    };
                } else if (/msie|trident/i.test(ua)) {
                    result = {
                        name: 'Internet Explorer',
                        vendor: 'Microsoft',
                        msie: t,
                        version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
                    };
                } else if (/chrome|crios|crmo/i.test(ua)) {
                    result = {
                        name: 'Chrome',
                        vendor: 'Google',
                        chrome: t,
                        version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
                    };
                } else if (iosdevice) {
                    result = {
                        name: iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod',
                        vendor: 'Apple'
                    };
                    //  version is not part of user agent in web apps
                    if (versionIdentifier) {
                        result.version = versionIdentifier
                    };
                } else if (/sailfish/i.test(ua)) {
                    result = {
                        name: 'Sailfish',
                        sailfish: t,
                        version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
                    };
                } else if (/seamonkey\//i.test(ua)) {
                    result = {
                        name: 'SeaMonkey',
                        seamonkey: t,
                        version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
                    };
                } else if (/firefox|iceweasel/i.test(ua)) {
                    result = {
                        name: 'Firefox',
                        vendor: 'Mozilla',
                        firefox: t,
                        version: getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
                    };
                    if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
                        result.firefoxos = t;
                    }
                } else if (/silk/i.test(ua)) {
                    result = {
                        name: 'Silk',
                        vendor: 'Amazon',
                        silk: t,
                        version: getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
                    };
                } else if (android) {
                    result = {
                        name: 'Android',
                        vendor: 'Google',
                        version: versionIdentifier
                    };
                } else if (/phantom/i.test(ua)) {
                    result = {
                        name: 'PhantomJS',
                        phantom: t,
                        version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
                    };
                } else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
                    result = {
                        name: 'BlackBerry',
                        blackberry: t,
                        version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
                    };
                } else if (/(web|hpw)os/i.test(ua)) {
                    result = {
                        name: 'WebOS',
                        webos: t,
                        version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
                    };
                    /touchpad\//i.test(ua) && (result.touchpad = t);
                } else if (/bada/i.test(ua)) {
                    result = {
                        name: 'Bada',
                        bada: t,
                        version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
                    };
                } else if (/tizen/i.test(ua)) {
                    result = {
                        name: 'Tizen',
                        tizen: t,
                        version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
                    };
                } else if (/safari/i.test(ua)) {
                    result = {
                        name: 'Safari',
                        vendor: 'Apple',
                        safari: t,
                        version: versionIdentifier
                    };
                } else
                    result = {};

                // set webkit or gecko flag for browsers based on these engines
                if (/(apple)?webkit/i.test(ua)) {
                    result.name = result.name || "Webkit";
                    result.webkit = t;
                    if (!result.version && versionIdentifier) {
                        result.version = versionIdentifier;
                    }
                } else if (!result.opera && /gecko\//i.test(ua)) {
                    result.name = result.name || "Gecko";
                    result.gecko = t;
                    result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i);
                }

                // set OS flags for platforms that have multiple browsers
                if (android || result.silk) {
                    result.android = t;
                } else if (iosdevice) {
                    result[iosdevice] = t;
                    result.ios = t;
                }

                // OS version extraction
                var osVersion = '';
                if (iosdevice) {
                    osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
                    osVersion = osVersion.replace(/[_\s]/g, '.');
                } else if (android) {
                    osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
                } else if (result.windowsphone) {
                    osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
                } else if (result.webos) {
                    osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
                } else if (result.blackberry) {
                    osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
                } else if (result.bada) {
                    osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
                } else if (result.tizen) {
                    osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
                }
                if (osVersion) {
                    result.osversion = osVersion;
                }

                // device type extraction
                var osMajorVersion = osVersion.split('.')[0];
                if (tablet || iosdevice == 'ipad' || (android && (osMajorVersion == 3 || (osMajorVersion == 4 && !mobile))) || result.silk) {
                    result.tablet = t;
                } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
                    result.mobile = t;
                }

                /* Graded Browser Support
            // http://developer.yahoo.com/yui/articles/gbs
            if ((result.msie && result.version >= 10) || (result.chrome && result.version >= 20) || (result.firefox && result.version >= 20.0) || (result.safari && result.version >= 6) || (result.opera && result.version >= 10.0) || (result.ios && result.osversion && result.osversion.split(".")[0] >= 6)) {
                result.a = t;
            } else if ((result.msie && result.version < 10) || (result.chrome && result.version < 20) || (result.firefox && result.version < 20.0) || (result.safari && result.version < 6) || (result.opera && result.version < 10.0) || (result.ios && result.osversion && result.osversion.split(".")[0] < 6)) {
                result.c = t;
            } else
                result.x = t;
			*/
                return result;
            }
            //End bower detect
            //Return the results of the Bowser detect function.
            return detect(ua);

        },
        //End bowser function

        //system check
        _boaBrowserSystemCheck = function() {

            try {
                /*Browser Feature Detection*/

                /* SVG backgrounds */
                if (!!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) {
                    boaBrowserObject.svg = true;
                }

                /* Retina images */
                if (!!window.matchMedia && !!window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)").matches) {
                    boaBrowserObject.retna = true;
                }

                //detect platform by looking at platform or ua
                var p = settings.platform || settings.ua;

                if (p.indexOf("Win") > -1) {
                    boaBrowserObject.win = true;
                } else if (p.indexOf("Mac") > -1) {
                    boaBrowserObject.mac = true;
                } else if (p.indexOf("X11") > -1 || p.indexOf("Linux") > -1) {
                    boaBrowserObject.linux = true;
                } else {
                    boaBrowserObject.win = true; //default win
                }

                //Find win, mac & linux that was not identified as mobile by Bowser
                boaBrowserObject.desktop = (!boaBrowserObject.mobile && !boaBrowserObject.tablet && (boaBrowserObject.win || boaBrowserObject.mac || boaBrowserObject.linux));

                //detect windows operating systems
                if (boaBrowserObject.win) {
                    if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(settings.ua)) {

                        if (RegExp["$1"] == "NT") {
                            switch (RegExp["$2"]) {
                                case "5.0":
                                    boaBrowserObject.osversion = "2000";
                                    break;
                                case "5.1":
                                    boaBrowserObject.osversion = "XP";
                                    break;
                                case "6.0":
                                    boaBrowserObject.osversion = "Vista";
                                    break;
                                case "6.1":
                                    boaBrowserObject.osversion = "Windows 7";
                                    break;
                                case "6.2":
                                    boaBrowserObject.osversion = "Windows 8";
                                    break;
                                default:
                                    boaBrowserObject.osversion = "";
                                    break;
                            }
                            //Windows Phone
                        } else if (RegExp["$1"] == "Ph") {
                            if (/Windows Phone OS.?(\d+\.\d+)?/.test(settings.ua)) {
                                boaBrowserObject.osversion = RegExp["$1"];
                            }
                        } else if (RegExp["$1"] == "9x") {
                            boaBrowserObject.osversion = "ME";
                        } else {
                            boaBrowserObject.osversion = RegExp["$1"];
                        }
                    }
                }
            } catch (e) {
                _debug('boaBrowserDetect:_boaBrowserSystemCheck: error: ' + e);
            };

            return;
        },

        /* Browser plugin detection*/
        _boaBrowserPluginCheck = function() {

            var plugins = {};

            //plugin detection - doesn't work in IE
            function hasPlugin(name) {
                name = name.toLowerCase();
                for (var i = 0; i < navigator.plugins.length; i++) {
                    if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
                        return true;
                    }
                }
                return false;
            }

            //plugin detection for IE
            function hasIEPlugin(name) {
                try {
                    new ActiveXObject(name);
                    return true;
                } catch (ex) {
                    return false;
                }
            }

            //detect flash for all browsers
            function hasFlash() {
                var r = hasPlugin("Flash");
                if (!r) {
                    r = hasIEPlugin("ShockwaveFlash.ShockwaveFlash");
                }
                return r;
            }

            //detect quicktime for all browsers
            function hasQuickTime() {
                var r = hasPlugin("QuickTime");
                if (!r) {
                    r = hasIEPlugin("QuickTime.QuickTime");
                }
                return r;
            }

            try {
                plugins.flash = hasFlash();
                plugins.quicktime = hasQuickTime();
                boaBrowserObject.plugins = plugins;
            } catch (err) {}
            // end plugin check

            return;
        },

        //Make AJAX request to get latest browser content and rules
        _boaBrowserUpdateMessageData = function() {

            //if local, skip ajax unless testMode is on in localhost
            if (settings.isLocal && (window.location.protocol == "file:" || !settings.testMode)) {
                _boaBrowserProcessRules();
                boaBrowserObject.loaded = true;
                $(document).trigger('boaBrowserObjectLoaded');

                return;
            }

            $.ajax({
                type: "GET",
                url: "/content/browser-support/js/browserDataCMS.js",
                dataType: "script",
                cache: true,

                success: function(data, textStatus, jqxhr) {

                    try {
                        //CMS data loaded successfully
                        if (typeof boaBrowserSupportCMS !== "undefined" && boaBrowserSupportCMS.content) {

                            //update browser obj
                            boaBrowserObject.browserSupport = boaBrowserSupportCMS;

                            //tag this obj as coming from CMS
                            boaBrowserObject.browserSupport.source = "cms";

                            settings.showMessage = boaBrowserSupportCMS.showMessage;

                            //Run rules for this browser
                            _boaBrowserProcessRules();

                            //save obj to session storage
                            _boaBrowserSetSessionStorage();

                            //alert other code that browser object is available
                            boaBrowserObject.loaded = true;
                            $(document).trigger('boaBrowserObjectLoaded');

                        }

                    } catch (e) {
                        _debug('boaBrowserDetect:_boaBrowserUpdateMessageData: ajax error: ' + e);
                    };
                }
            });
            //Get new browser rules & messages from CMS data
        },

        //Run Browser Message Rules & update browser object
        _boaBrowserProcessRules = function() {

            _debug('boaBrowserDetect: begin _boaBrowserProcessRules');
            //Run Browser Rules
            var userMsg = boaBrowserObject.browserSupport.rules(boaBrowserObject);

            //if there is a message, sync up global object
            if (userMsg && userMsg.rule) {
                boaBrowserObject.userNotice = userMsg;
            }
            //Once rules are processed, Show message to user.  Have to do this here to ensure ajax call is complete.  Only do this after DOM ready.
            _boaBrowserShowMessage();

        },
        /*Check the properties that would suppress the browser message.
	Skip if cookie found for msg previously closed || JS var boaBrowserShowNotice == false || URL Param boaBrowserShowNotice == false*/
        _checkShowMessage = function() {
            try {
                //Don't show browser alert for local work unless in testMode
                if (settings.isLocal && !settings.testMode) {
                    _debug("Working in local module / localhost, suppress browser alert");
                    return false;
                }

            } catch (e) {
                _debug('boaBrowserDetect: _checkShowMessage error: ' + e);
            }

            if (!settings.showMessage ||
                settings.boaBrowserShowNoticeCookie === "false" ||
                (typeof boaBrowserShowNotice !== "undefined" && boaBrowserShowNotice === false) ||
                boaGetUrlParam("boaBrowserShowNotice") === "false" ||
                (typeof boaGlobalData !== "undefined" && boaGlobalData.pageDataJS.blockBrowserNotice === "true")) {
                return false;
            }
            return true;

        },
        /* Display browser notification message after doc.ready.*/
        _boaBrowserShowMessage = function() {

            $(document).ready(function() {
                _debug('in _boaBrowserShowMessage');
                //die if showMessage is off

                //Check show message again after doc ready
                settings.showMessage = _checkShowMessage();

                if (!settings.showMessage) {
                    _debug('showMessage is false');
                    return;
                }

                var userMsg, closeText, msg, style, btnText, link, b = boaBrowserObject,
                    currentBrowserInfo = "",
                    loc = window.location.hostname,
                    langClass = "lang-es";

                boaBrowserObject.browserSupport.url = boaBrowserObject.browserSupport.url || {};
                //Set link based on env
                if (/(cert|qa|sit).*\.bankofamerica\.com$/.test(loc)) {
                    link = boaBrowserObject.browserSupport.url.cert;
                } else if (/(dev).*\.bankofamerica\.com$/.test(loc)) {
                    link = boaBrowserObject.browserSupport.url.dev;
                } else {
                    link = boaBrowserObject.browserSupport.url.prod;
                }
                link += b.userNotice.link;

                //Check if there is a message to show
                if (b.userNotice && b.userNotice.rule && b.userNotice.en) {
                    if (b.name.length > 0 && b.version.length > 0) {
                        currentBrowserInfo = ($boaLangObj.boaLang === "es-us" ? b.browserSupport.content.misc.es.current : b.browserSupport.content.misc.en.current) + ' ' + b.name + ' ' + b.version + '<br>';
                    }
                    langClass = $boaLangObj.boaLang === "es-us" ? "lang-es" : "lang-en";
                    style = b.userNotice.style + " " + langClass;
                    msg = $boaLangObj.boaLang === "es-us" ? b.userNotice.es.msg : b.userNotice.en.msg;
                    btnText = $boaLangObj.boaLang === "es-us" ? b.userNotice.es.btnText : b.userNotice.en.btnText;
                    closeText = $boaLangObj.boaLang === "es-us" ? b.browserSupport.content.misc.es.closeText : b.browserSupport.content.misc.en.closeText;

                    var notice = b.browserSupport.template.replace('{currentBrowserInfo}', "").replace('{style}', style).replace('{msg}', msg).replace('{link}', link).replace('{btnText}', btnText).replace('{closeText}', closeText);

                    $('body div:first').before(notice);

                    //if user closes the message, don't show again for this session.
                    $('#browserUpgradeNoticeBarClose').click(function() {
                        $('#browserUpgradeNoticeBar').hide();
                        document.cookie = "boaBrowserShowNotice=false; path=/; domain=.bankofamerica.com";
                    });
                }
                return;
            });
        },
        /* check for local storage & retrieve browser obj*/
        _boaBrowserGetSessionStorage = function() {

            try {
                if (settings.useSessionStorage && window.sessionStorage.getItem("boaData") && typeof JSON !== "undefined") {
                    var boaData = JSON.parse(window.sessionStorage.getItem("boaData"));
                    if (boaData.boaBrowserObject) {
                        return boaData.boaBrowserObject
                    }
                }
            } catch (e) {
                _debug("_boaBrowserGetSessionStorage: error: " + e);
            }
            return false;
        },

        /*Save boaBrowserObject into session storage*/
        _boaBrowserSetSessionStorage = function() {

            if (settings.useSessionStorage && typeof JSON !== "undefined") {

                var boaData = {
                    "boaBrowserObject": boaBrowserObject
                };

                sessionStorage.setItem('boaData', JSON.stringify(boaData));
            }
        },
        /*Define Default Browser Object*/
        _boaBrowserGetDefaultObj = function() {

            var boaBrowserDefault = {
                "loaded": false,
                "ua": settings.ua,
                "debug": settings.debug,
                //graded support - used in bowser
                "a": false,
                "c": false,
                "x": false,
                "retna": false,
                "svg": false,

                //user agent names
                "msie": false,
                "edge": false,
                "chrome": false,
                "firefox": false,
                "safari": false,
                "opera": false,
                "android": false,
                "ios": false,
                "iosdevice": false,
                "ipad": false,
                "iphone": false,
                "ipod": false,
                "blackberry": false,

                //user agent details
                "name": "",
                "vendor": "",
                "version": "",
                "webkit": false,
                "gecko": false,

                //device & system, plugins info
                "tablet": false,
                "mobile": false,
                "desktop": false,
                "win": false,
                "mac": false,
                "linux": false,
                "osversion": "",
                "windowsphone": false,
                "plugins": {
                    "flash": false,
                    "quicktime": false
                },

                //Placeholder for user messaging
                "userNotice": {
                    "rule": "",
                    "en": {
                        "msg": ""
                    },
                    "es": {
                        "msg": ""
                    },
                    "link": ""
                },

                //default browser support buckets & content.  Kill switch: showMessage = false;
                "browserSupport": {
                    "source": "js",
                    "showMessage": true,
                    "url": {
                        "prod": "https://www.bankofamerica.com",
                        "cert": "https://www-cert1.ecnp.bankofamerica.com",
                        "dev": "https://www-dev2.ecnp.bankofamerica.com"
                    },
                    "content": {
                        "unsupportedBlocked": {
                            "rule": "unsupportedBlocked",
                            "style": "boa-browser-1 hide-close",
                            "en": {
                                "msg": "You're using an outdated browser that's no longer compatible with our site.",
                                "btnText": "See recommended browsers"
                            },
                            "es": {
                                "msg": "Está usando un navegador desactualizado que ya no es compatible con nuestro sitio.",
                                "btnText": "Vea los navegadores recomendados"
                            },
                            "link": "/information/supported-browsers/"
                        },
                        "unsupportedBrowserType": {
                            "rule": "unsupportedBrowserType",
                            "style": "boa-browser-1",
                            "en": {
                                "msg": "Our site may not work properly for the browser you're using.",
                                "btnText": "See recommended browsers"
                            },
                            "es": {
                                "msg": "Es posible que nuestro sitio no funcione adecuadamente con el navegador que está usando.",
                                "btnText": "Vea los navegadores recomendados"
                            },
                            "link": "/information/supported-browsers/"
                        },
                        "unsupportedEndOfLife": {
                            "rule": "unsupportedEndOfLife",
                            "style": "boa-browser-1",
                            "en": {
                                "msg": "Our site may not work properly for the older browser you're using.",
                                "btnText": "See recommended browsers"
                            },
                            "es": {
                                "msg": "Es posible que nuestro sitio no funcione adecuadamente con el navegador más antiguo que está usando.",
                                "btnText": "Vea los navegadores recomendados"
                            },
                            "link": "/information/supported-browsers/"
                        },
                        "supportedUpgradeVersion": {
                            "rule": "supportedUpgradeVersion",
                            "style": "boa-browser-2",
                            "en": {
                                "msg": "Get a better experience on our site by updating to the current version of your browser.",
                                "btnText": "See recommended browsers"
                            },
                            "es": {
                                "msg": "Obtenga una mejor experiencia en nuestro sitio actualizando su navegador a la versión más reciente.",
                                "btnText": "Vea los navegadores recomendados"
                            },
                            "link": "/information/supported-browsers/"
                        },
                        "supportedBrowser": {
                            "rule": "supportedBrowser"
                        },
                        "mobileBrowser": {
                            "rule": "mobileBrowser"
                        },
                        "misc": {
                            "en": {
                                "current": "Browser in use:",
                                "closeText": "close"
                            },
                            "es": {
                                "current": "Navegador en uso:",
                                "closeText": "cerrar"
                            }
                        }
                    },
                    "rules": function(b) {

                        var userMsg;
                        /*Mobile Browsers*/
                        if (b.mobile || b.tablet) {

                            /*no message for any mobile device*/
                            userMsg = b.browserSupport.content.mobileBrowser;

                        /*Blocked versions*/
                        } else if ((b.msie && b.version <= 6) || (b.firefox && b.version <= 2)) {

                            userMsg = b.browserSupport.content.unsupportedBlocked;

                        /*Unsupported browser types: Not big 4 (Win IE, Chrome, Win FF, Mac Safari)*/
                        } else if (!(b.win && b.msie) && !b.chrome && !(b.win && b.firefox) && !(b.mac && b.safari)) {

                            userMsg = b.browserSupport.content.unsupportedBrowserType;

                            /*Deprecated / Support End of Life for these browser versions.  */
                        } else if (
                            (b.msie && b.version <= 9) || //msie
                            (b.chrome && b.version <= 47) || //chrome
                            (b.firefox && b.version <= 43) || //firefox
                            (b.safari && b.version <= 7)) { //safari

                            userMsg = b.browserSupport.content.unsupportedEndOfLife;

                            /*Supported, but outdated browser versions, recommend upgrade
                } else if (
                  (b.chrome && b.version <= 35) ||		//chrome 20+
                  (b.firefox && b.version <= 30) ||		//fireforx 20+
                  (b.safari && b.version <= 6))		 	//safari 6  {

                    userMsg = b.browserSupport.content.supportedUpgradeVersion;
			*/
                        } else {

                            userMsg = b.browserSupport.content.supportedBrowser;

                        }
                        return userMsg;
                    },
                    "template": "<div id='browserUpgradeNoticeBar' class='{style} no-print' style='font-family: arial; font-size: 14px;'>" +
                        "<div style='width: 980px; margin: 0 auto; text-align: center; position: relative;'>" +
                        "<a id='browserUpgradeNoticeBarClose' style='font-size: 11px; position: absolute; right: 9px; top: 5px;' href='javascript:void(0);'>" +
                        "<span style='display: inline-block; margin-right: 10px;'>{closeText}<span class='ada-hidden'> browser upgrade notice</span></span><span class='close-fsd' style='display: inline-block; position: relative; top: 4px;'></span></a>" +
                        "<div style='display: inline-block; *display: inline; zoom: 1; padding: 0 0 3px 0;'>" +
                        "<div class='msg-icon-sprite-fsd' style='display: inline-block; *display: inline; zoom: 1; position: relative; top: 4px; left: -10px;'><span class='ada-hidden'>warning-icon</span></div>" +
                        "<span style='display: inline-block; *display: inline; zoom: 1; position: relative; top: -2px; max-width: 810px;'>{currentBrowserInfo}{msg}<a target='_blank' href='{link}' name='boaBrowserInfoBtn' id='boaBrowserInfoBtn' class='browser-upgrade-now' style='margin-left: 10px;'>{btnText}</a></span>" +
                        "</div></div>" +
                        "<style>#browserUpgradeNoticeBar.hide-close #browserUpgradeNoticeBarClose {display:none;} #browserUpgradeNoticeBar.boa-browser-1 { background-color: #FFF4F9; border-bottom: 1px solid #E31838; } #browserUpgradeNoticeBar.boa-browser-1 .msg-icon-sprite-fsd {background-position: -70px 0;height:24px;width:24px;} #browserUpgradeNoticeBar.boa-browser-2 { background-color: #FFF5D7; border-bottom: 1px solid #FC7800; } #browserUpgradeNoticeBar.boa-browser-2 .msg-icon-sprite-fsd {background-position: -70px -240px;height:24px;width:24px;} #browserUpgradeNoticeBar.lang-es span { font-size: 13px !important;}</style></div>"
                }

            };
            return boaBrowserDefault;
        },

        /*Set Browser CSS classes in HTML based on Browser obj */
        _setBrowserCSS = function() {

            try {
                var b = boaBrowserObject;
                var osName = (b.win ? "win" : (b.mac ? "mac" : "")); //set os to "win" || "mac"
                var browserUserAgent = navigator.userAgent;
                version = parseInt(b.version);
                var browserName = "";
                var addBrowserClass = "";
                var browserClass = "";

                //for browsers we support...
                if (b.msie || b.firefox || b.chrome || b.safari) {
                    switch (true) {

                        case b.msie:
                            browserName = "ie";
                            if (version === 9) {
                                addBrowserClass += " lt-ie10";
                            } else if (version === 8) {
                                addBrowserClass += " lt-ie10 lt-ie9";
                            } else if (version === 7) {
                                addBrowserClass += " lt-ie10 lt-ie9 lt-ie8";
                            }
                            break;

                        case b.firefox:
                            browserName = "ff";
                            break;
                        case b.chrome:
                            browserName = "chrome";
                            addBrowserClass = " webkit";
                            break;
                        case b.safari:
                            browserName = "safari";
                            addBrowserClass = " webkit";
                            break;
                    }

                    browserClass = osName + " " + browserName + " " + browserName + "-" + version + addBrowserClass;

                }

                b.svg ? browserClass += " svg-bg" : browserClass += " not-svg-bg";
                b.retna ? browserClass += " retina" : browserClass += " not-retina";

                $('html').addClass(browserClass);

            } catch (e) {
                _debug('boaBrowserDetect: _setBrowserCSS error: ' + e);
            }
        },

        /*Reformat phone numbers on mobile devices based on class: ".boa-mobile-tel"
     To format ajax content: boaBrowserDetect.formatMobilePhoneNum($context) and pass in jQ selector*/
        _formatMobilePhoneNum = function($context) {

            try {
                if (boaBrowserObject.mobile) {
                    if (typeof $context == "undefined") {
                        var $context = $("body");
                    }
                    var $tel = $context.find('.boa-mobile-tel').each(function() {
                        var phone = this.innerHTML.replace(/\D/g, "");
                        if (phone.length == 10) {
                            phone = "1" + phone;
                        }
                        this.innerHTML = '<a href="tel:+' + phone + '">' + this.innerHTML + "</a>";
                    });
                }
            } catch (e) {
                _debug('boaBrowserDetect: _formatMobilePhoneNum error: ' + e);
            }
        };

    /* Return public functions to be accessed by others.
     */
    return {
        init: _initialize,
        formatMobilePhoneNum: _formatMobilePhoneNum,
        hideBrowserAlert: _hideBrowserAlert
    };
}(jQuery);
//initialize on document.ready
boaBrowserDetect.init();