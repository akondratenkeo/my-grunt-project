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
});
