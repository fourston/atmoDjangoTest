$(document).ready(function(){
    setAboutImgHeight();

    $(window).resize(function() {
        setAboutImgHeight();
    });

    function setAboutImgHeight () {
        var windowHeight = $(window).height(),
            windowWidth = $(window).width(),
            contentShift = parseInt($('.content__border').css('margin-top')),
            aboutShift = parseInt($('.promo-about').css('padding-top')),
            navShift = parseInt($('.navigation').css('top'));
            
        $('.promo-about__img').height(windowHeight - contentShift - navShift - aboutShift);
    }

});