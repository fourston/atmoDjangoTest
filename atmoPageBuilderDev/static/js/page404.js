$(document).ready(function(){
    set404Height();

    $(window).resize(function() {
        set404Height();
    });

    function set404Height () {
        var windowHeight = $(window).height(),
            contentShift = parseInt($('.content__border').css('margin-top'));
            
        $('.page-404').css('height', windowHeight - contentShift);
    }

});