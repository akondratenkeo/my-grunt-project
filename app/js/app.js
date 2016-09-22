/**
 * Custom
 */
function remove_modal_effect(){
    var step2_main__lic_modal = $('.step2_main__bordered').find('a[href="#modal_lic_front"]');
    step2_main__lic_modal.on('click', function(){
        $('html').css('overflow', 'auto');
        console.log('modal');
    });
}

function eq_sidebar(){
    var sidebar_height = $('.account_profile_sidebar');
    var content_height = $('.account_profile_main');
    content_height.css('min-height', sidebar_height.height());
}

function car_select_active_nav(){
    var show_car_select_content = $('#show-car-select-content');
    var show_car_select_map = $('#show-car-select-map');
    var car_select_content = $('#car-select-content');
    var car_select_map = $('#car-select-map');

    show_car_select_content.on('click', function(){
        var elem = $('#pop_icon_mobile_2');
        elem.addClass('active-menu-button-map-list');
        show_car_select_map.removeClass('active-car-select-nav');
        $(this).addClass('active-car-select-nav');
        car_select_map.css('display', 'none');
        car_select_content.css('display', 'block');
    });

    show_car_select_map.on('click', function(){
        var elem = $('#pop_icon_mobile_3');
        elem.addClass('active-menu-button-car-list');
        show_car_select_content.removeClass('active-car-select-nav');
        $(this).addClass('active-car-select-nav');
        car_select_content.css('display', 'none');
        car_select_map.attr('style', '');
        car_select_map.css('display', 'block');
    });
}

$(document).ready(function() {
    $.fn.equalHeights = function() {
        var maxHeight = 0,
            $this = $(this);

        $this.each( function() {
            var height = $(this).innerHeight();

            if ( height > maxHeight ) { maxHeight = height; }
        });

        return $this.css('height', maxHeight);
    };

    $('[data-equal]').each(function(){
        var $this = $(this),
            target = $this.data('equal');
        $this.find(target).equalHeights();
    });

    remove_modal_effect();

    eq_sidebar();
    $(".account_orders_main__content").jScrollPane();
    $(".account_preferences_main__content__places__content").jScrollPane({autoReinitialise: true});
    $('.uk-dropdown').jScrollPane({autoReinitialise: true});

    car_select_active_nav();

});

$('.verify').fancySelect();
$('.custom-select-dropdown').fancySelect();
$('.options').jScrollPane();
// STEP2
$('#files-second').change(function(e){handleFileSelectSteps(e,'second-list')});
$('#files-first').change(function(e){handleFileSelectSteps(e,'first-list')});
$('#files').change(function(e){handleFileSelectSteps(e,'list')});
$('#files-step5').change(function(e){handleFileSelect(e,'step5-list')});
$('#edit-photo-account').change(function(e){handleFileSelectAccount(e,'show-photo')});
$('#edit-photo-login').change(function(e){handleFileSelect(e,'list')});
$('#mobile-change-photo').change(function(e){handleFileSelect(e,'mobile-container')});

function handleFileSelect(evt, list) {

    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {

        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

        reader.onload = (function(theFile) {
            return function(e) {
                var span = document.createElement('span');
                    document.getElementById(list).innerHTML = ['<img class="thumb" src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');

            };
        })(f);
        $('.circle_img').css('background', "#ffffff");
        reader.readAsDataURL(f);
    }
}

function handleFileSelectAccount(evt, list) {

    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {

        if (!f.type.match('image.*') && !f.type.match('pdf')) {
            console.log(111)
            continue;
        }

        var checkTifFile = f.type.match('image.tif');
        var reader = new FileReader();

        reader.onload = (function(theFile) {
            return function(e) {
                var tiffLink = '/images/plug-format-tiff.png'
                var pdfLink = '/images/def-img.png'
                var span = document.createElement('span');

                if(checkTifFile) {
                    document.getElementById(list).innerHTML = ['<img class="thumb" src="', tiffLink, '" title="', escape(theFile.name), '"/>'].join('');
                }else if (files[0].type.match("application/pdf")){
                    document.getElementById(list).innerHTML = ['<img class="thumb" src="', pdfLink, '" title="', escape(theFile.name), '"/>'].join('');
                }else {
                    document.getElementById(list).innerHTML = ['<img class="thumb" src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
                }
            };
        })(f);

        reader.readAsDataURL(f);
    }
}

function handleFileSelectSteps(evt, list) {

    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {

        if (!f.type.match('image.*') && !f.type.match('pdf')) {
            console.log(111)
            continue;
        }

        var checkTifFile = f.type.match('image.tif');
        var reader = new FileReader();

        reader.onload = (function(theFile) {
            return function(e) {
                var tiffLink = '/images/plug-format-tiff.png'
                var pdfLink = '/images/plug-format-pdf.png'
                var span = document.createElement('span');

                if(checkTifFile) {
                    document.getElementById(list).innerHTML = ['<img class="thumb" src="', tiffLink, '" title="', escape(theFile.name), '"/>'].join('');
                }else if (files[0].type.match("application/pdf")){
                    document.getElementById(list).innerHTML = ['<img class="thumb" src="', pdfLink, '" title="', escape(theFile.name), '"/>'].join('');
                }else {
                    document.getElementById(list).innerHTML = ['<img class="thumb" src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
                }
            };
        })(f);

        reader.readAsDataURL(f);
    }
}

// STEP4
$(function() {
    var pricesCollectionBlock = $('.uk-width-medium-1-3');
    var pricesInput = $('#join-plan_id');

    pricesCollectionBlock.each(function() {
        var that = $(this);
        that.find($('.main__heading__btn')).each(function () {
            $(this).click(function () {
                pricesInput.val(that.find($('.regestration-price-hidden')).text());
            });
        });
    });

    $(".uk-panel-title span").click(function() {
        $(".uk-panel-title span").removeClass("active-plan-step4");
        $(this).toggleClass("active-plan-step4");
    });

});

// STEP5
$(function() {
    var signDiv = $("#step5-signature");
    signDiv.jSignature();

    $(signDiv).bind('change', function(e){
        var jSign = signDiv.jSignature('getData', 'image');
        $("#hidden_signature_hand").val("data:" + jSign[0] + "," + jSign[1]);
    });
});

// STEP6
/*$(function() {
    $('#media_button').on("click", function(e){
        e.preventDefault();
        $("#join-finish-redirect").val('media');
        $("#join-finish-form").submit();
    });
});*/

// PAYMENT CHANGE
$(function() {
    var paymentsCollectionBlock = $(".block-plan");
    var paymentsInput = $('#change_payment_id');

    paymentsCollectionBlock.each(function() {
        var that = $(this);
        that.find($('.main_title')).each(function () {
            $(this).click(function () {
                paymentsInput.val(that.find($('.payment-hidden')).text());
            });
        });
    });

    $(".name_block_plan").click(function() {
        $(".name_block_plan").removeClass("active-plan-step4");
        $(this).toggleClass("active-plan-step4");
    });
});

$('.ui-timepicker-list').jScrollPane();

// B_STEP 6 upload file
$(document).ready(function() {
    $('.b_step4_main__footer__sign1__item').click(function () {
        var mainSelf = $(this);
        mainSelf.each(function () {
            var self = $(this);
            var findInput = self.find($('.input_style'));
            findInput.change(function() {
                findInput.each(function() {
             var name = this.value;
                    var idInput= this.id;
             reWin = /.*\\(.*)/;
             var fileTitle = name.replace(reWin, "$1");
             reUnix = /.*\/(.*)/;
             fileTitle = fileTitle.replace(reUnix, "$1");
                    if(name === "" && idInput === 'file_one'){
                        mainSelf.find($('.namefile')).html(t('b_step_sig'));
                    }else if (name === "" && idInput === 'file_second'){
                        mainSelf.find($('.namefile')).html(t('b_step_stamp'));
                    }else {
                        mainSelf.find($('.namefile')).html(fileTitle);
                    }
             });
             });
        });
    })
});

$(document).keyup(function (e) {
    if (!$("html").hasClass("uk-modal-page")) {
        if ($("#loginform-password").val() != '' && (e.keyCode === 13)) {

            //Forgot password modal
            var modal = UIkit.modal("#generic-popup");
            if ( !modal.isActive() ) {
                $('#login-form').submit();
            }

        }
    }
});

function showBlock() {
    return setTimeout(function(){
        $('div[role="alert"]').fadeOut('slow')
    },3000);
}
showBlock();

//Ajax error
//function _ajaxError(xhr, ajaxOptions, thrownError) {
    //$('a[href="#api-error"]').click();
//};
// fix reg_popup phone code jspscroll
setTimeout((function (){
    $('.phone-code .fancy-select').click(function () {
        console.log(111)
        $('.options').jScrollPane();
    })
}()), 100);


var test = $("#cars-index").find('select').find('option').length
if(test <= 3) {
    console.log('less 3')
    $("#cars-index").find('.car_select_main__nav.jspPane').css('width', '100%')
}else {
    console.log('more than 3')
}

$(window).on('load resize',function(){
    if(typeof $("body#integration-error")[0] === "object") {
        if ($(window).height() >= 150) {
            bodyHeight = $(window).height();
            $('.wrap').css('height', bodyHeight);
        }
    }
    if(typeof $("body#integration-add-driver.body-integration")[0] === "object") {
        if ($(window).height() >= 900) {
            bodyHeight = $(window).height() + $('.account_driver_add_main__other-drivers').height();
            $('.wrap').css('height', bodyHeight);
            $('.wrap').css('padding-bottom', '50px');
        }
    }
});

function addFlash(flashMessage) {
    console.log('addFlash message = ' + flashMessage.message + ' state ' + flashMessage.state);

    $('.wrap .message-box').css("display","block");

    $('.box-message-time').addClass(flashMessage.state);

    // $('.box-message-time')
     //    .find('.title')
     //    .html(flashMessage.state);

    $('.box-message-time')
        .find('.small')
        .html(flashMessage.message);

    $('.box-message-time')
        .fadeIn().delay(3000).fadeOut();
}

// Array Remove - By John Resig (MIT Licensed)
/*Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};*/
/*// timepicker mozilla styles
if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ){
    $(".time-picker").find('input').css('text-shadow','90px 0 0 #000');
    $('#cars-index .uk-form .homepage__order_content__item input[type=text]').css('text-shadow','180px 0 0 #fff')
}*/

(function () {
    if ($('.inputfile').children().is('img') === true) {
        $('#member-join-step1 .inputfile').css('background', '#e5e9ea');
    }
}());

/*
 $(document).ready(function() {
 $('iframe').contents().on('ready', function () {
 alert('Ready');
 });

 });*/

//$('#multiple-end-mobile').on('tap', handler);
$(document).ready(function () {
    $('#profile-edit #nav-menu-mobile-drop-down-container').find('.trigger').text(t('name_profile'));
    $('#payment-edit #nav-menu-mobile-drop-down-container').find('.trigger').text(t('payment_info'));
});

$(window).scroll(function (event) {
    if ($(window).scrollTop() > 290) {
        $(".show-map-mobile").addClass("fix-map");
    }else {
        $(".show-map-mobile").removeClass("fix-map");
    }
});

$('body').on('tap', function () {
    /*var modal = UIkit.modal('#time-picker-mobile-start');
    modal.show();*/
});

//$('input[type=password]').disableAutocomplete();

/*
$('multiple-start-mobile').on('tap', function () {
    $('multiple-start-mobile').timepicker({
        trigger_event: 'touchstart'
    });
});*/

function deleteWhiteSpaceDesktop() {
    $('.time-picker').click(function (){
        console.log($(this).find('.trigger').next().find('li').length);
        if($(this).find('.trigger').next().find('li').length == 0) {
            $(this).find('ul.options').css('max-height', '0px')
        }
        if($(this).find('.trigger').next().find('li').length == 1) {
            $(this).find('ul.options').css('max-height', '41px')
        }
        if($(this).find('.trigger').next().find('li').length == 2) {
            $(this).find('ul.options').css('max-height', '82px')
        }
        if($(this).find('.trigger').next().find('li').length == 3) {
            $(this).find('ul.options').css('max-height', '123px')
        }
        if($(this).find('.trigger').next().find('li').length == 4) {
            $(this).find('ul.options').css('max-height', '165px')
        }
    });
}
deleteWhiteSpaceDesktop();

var owlInit, owl;
function owlCarousel(){
    $(document).ready(function() {
        var count = 1;
var eventMouse;
        owlInit = $("#iw-container");
        owlInit.owlCarousel({
            navigation : true,
            slideSpeed : 100,
            paginationSpeed : 400,
            singleItem : true,
            rtl : true,
            touchDrag : false,
            mouseDrag : false
        });

        owl = $("#iw-container").data('owlCarousel');
        var total = owl.itemsAmount;

        $('#total-index').text(total);
var detectIE = navigator.userAgent.indexOf('MSIE')!= -1
    || navigator.appVersion.indexOf('Trident/') > 0 ||
    document.documentMode || /Edge/.test(navigator.userAgent);
            if (detectIE){
                eventMouse = 'click';
            }else {
                eventMouse = 'tap click';
            }
        $("#iw-container .owl-next").on(eventMouse, function(){
            owlInit.trigger('#iw-container .owl-next');
            count = count + 1;
            if (count > total) {
                count = 1;
            }
            $('#current-index').text(count);
            //console.log(count);
        });
        $("#iw-container .owl-prev").on(eventMouse, function(){
            owlInit.trigger('#iw-container .owl-prev');
            count = count - 1;
            if (count == 0) {
                count = total;
            }
            $('#current-index').text(count);
            //console.log(count);
        });
    });
}