$(document).ready(function(){
    ymaps.ready(initMap);

    var map,
        target = [56.14312754860755, 40.405179430000004],
        targetShift = [56.143326, 40.402171],
        targetShiftLarge = [56.143252, 40.401114],
        contentMinHeight = parseInt($('.contacts__content').css('min-height')),
        textHeightPos = $('.contacts__text-pos').height();

    setMapHeight();

    $(window).resize(function() {
        setMapHeight();

        if ($(window).width() < 1000) {
            map.setCenter(target);
        } else if ($(window).width() < 1600) {
            map.setCenter(targetShift);
        } else {
            map.setCenter(targetShiftLarge);            
        }
    });
    
    function initMap(){
        var coordinates = $(window).width() >= 1000 ? ($(window).width() >= 1600 ? targetShiftLarge : targetShift) : target;
        map = new ymaps.Map("map", {
            center: coordinates,
            zoom: 17
        }, {
            autoFitToViewport: 'always'
        });

        placemark = new ymaps.Placemark(target, {
            hintContent: 'Премиум фитнес-клуб Atmosphere',
            balloonContent: 'Владимир, ул. Батурина, 30<br /><b>Телефон:</b> +7 (4922) 77-88-33'
        },{
            iconLayout: 'default#image',
            iconImageHref: 'images/icons/icon_map.png',
            iconImageSize: [60, 76],
            iconImageOffset: [-30, -89]
        });

        map.behaviors.disable('scrollZoom');

        map.controls
            .remove('zoomControl')
            .remove('searchControl')
            .remove('trafficControl')
            .remove('typeSelector')
            .remove('routeButton')
            .remove('fullscreenControl')
            .remove('rulerControl')
            .remove('geolocationControl');


        map.controls.add('zoomControl', {position: {right: '20px', top: '20px'}});

        //console.log(map.getBounds());
        /*
        map.setBounds([[56.14137251029982, 40.40108637904329], [56.14488250643904, 40.40927248095674]], {
            useMappadding: true,
            zoompadding: [0, 0, 0, 500]
        });
        */

        map.geoObjects.add(placemark);
    }

    function setMapHeight () {
        var windowHeight = $(window).height(),
            windowWidth = $(window).width(),
            contentShift = parseInt($('body').css('padding-top')) * 2,
            wrapperShift = parseInt($('.contacts__wrapper').css('padding-top')) + parseInt($('.contacts__wrapper').css('padding-bottom')),
            content = $('.contacts__content'),
            contentHeight = $('.contacts__map').height() + textHeightPos,
            padding,
            textHeight,
            height;
            
        height = windowHeight - contentShift - wrapperShift;
        
        if (windowWidth >= 1000) {
            $('.contacts__map__img').height(height);
            $('.contacts__text').css('padding-top', 0);
            $('.contacts__text-pos').height('auto');
            content.height('auto');
        } else {
            $('.contacts__map__img').height('auto');
            if (height <= contentMinHeight) {
                content.height('auto');
            } else {
                if (height < contentHeight) {
                    content.css('height', contentHeight);
                } else {
                    content.css('height', height);
                }
            }

            textHeight = content.height() - $('.contacts__map').height();
            $('.contacts__text-pos').height(textHeight);

            padding = (textHeight - $('.contacts__text').height())/2;
            if (padding >= 20) {
                $('.contacts__text').css('padding-top', padding);
            }

        }
    }

});