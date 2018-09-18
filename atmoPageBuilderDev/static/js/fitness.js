$(document).ready(function(){
    var breakpoints = [1000, 1900],
        timeout;

    setFitnessScreenHeight();

    $(window).resize(function() {
        setFitnessScreenHeight();
    });

    function setFitnessScreenHeight () {
        var windowHeight = $(window).height(),
            windowWidth = $(window).width(),
            contentShift = parseInt($('.content__border').css('margin-top')),
            navShift = parseInt($('.navigation').css('top')),
            navHeight = $('.navigation').height(),
            topShift = getTopShift(),
            height;
        
        if (windowWidth >= breakpoints[1]) {
            height = $('.promo-fitness__person').find('img').height();
            $('.promo-fitness__person').css('margin-top', 50);
        } else if (windowWidth >= breakpoints[0]) {
            height = windowHeight - contentShift - topShift - navShift - navHeight;
            
            pheight = $('.promo-fitness__person').height();
            if (timeout) {
                window.clearTimeout(timeout);
            }
            
            if (pheight === 0) {
                window.setTimeout(function () {
                    timeout = pheight = $('.promo-fitness__person').height();
                }, 500);
            }
            if (pheight > 0) {
                $('.promo-fitness__person').css('margin-top', -parseInt(pheight/2) + 55);
            }
        } else {
            height = windowHeight - contentShift;
        }

        $('.promo-fitness__person-pos').css({
            'height': height + 'px',
            'line-height': height + 'px'
        });
    }

    function getTopShift() {
        return parseInt($('.content__border').css('margin-top'));
    }

});