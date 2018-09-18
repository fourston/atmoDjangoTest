$(document).ready(function(){
    setPriceImgHeight();

    $(window).resize(function() {
        setPriceImgHeight();
    });

    function setPriceImgHeight () {
        var windowHeight = $(window).height(),
            windowWidth = $(window).width(),
            contentShift = parseInt($('.content__border').css('margin-top')),
            navShift = parseInt($('.navigation').css('top')),
            priceShift = parseInt($('.price-wrapper').css('margin-top')),
            delta = 0;

        if (windowWidth >= 1000 && windowWidth < 1320) {
            delta = 50;
        } else if (windowWidth >= 1320 && windowWidth < 1900) {
            delta = 2;
        } else if (windowWidth >= 1900) {
            delta = 100;
        }

        if (windowWidth >= 1000) {
            height = windowHeight - contentShift - navShift + priceShift + delta;
        } else {
            height = 'auto';
        }

        $('.promo-price__img').height(height);
    }

});