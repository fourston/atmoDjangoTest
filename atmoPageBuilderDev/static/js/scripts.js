$(document).ready(function(){
    var os = new OnScreen({
      tolerance: 10,
      debounce: 25,
      container: window
    }),

    osVideo = new OnScreen({
      tolerance: 0,
      debounce: 30,
      container: window
    }),
    
    breakpoints = [1000],
    menuPopupMinHeight = parseInt($('.menu-popup__content').css('min-height')),
    
    timeout,
    didScroll,
    lastScrollTop = 0,
    delta = 5,

    animatedHeight,
    
    navbarHeight = $('nav').outerHeight(),
    
    carouselInterval;

    setHeight();
    initNavigationFixed();

    $(".video-popup").YouTubePopUp();
    $("body").bind('popupOpened', function() {
        window.setTimeout(function () {
            updateVideoPopup();
        }, 1);
    });

    window.setTimeout(function () {
        startCarousel();
    }, 1000);

    if ($('.gallery').length > 0) {
        setNavigationPos();
    }

    $(window).scroll(function(event){
        didScroll = true;
    });

    $(window).resize(function() {
        setHeight();
        updateVideoPopup();

        if ($('.gallery').length > 0) {
            setNavigationPos();
        }

        /*
        if ($('body').hasClass('menu-active')) {
            $('body').removeClass('menu-active');
        }

        if ($('body').hasClass('menu-in')) {
            $('body').removeClass('menu-in');
        }
        */
    });

    setInterval(function() {
        if (didScroll && !$('body').hasClass('menu-active')) {
            hasScrolled();
            didScroll = false;
        }
    }, 0);

    $('.feedback__form__input-phone').mask('+7 (000) 000-00-00', {placeholder: 'Номер телефона'});

    os.on('enter', '.to-animate', function (element) {
        $(element).addClass('is-animated');
    });

    osVideo.on('enter', '.to-animate-video', function (element) {
        var el;

        if ($(element).is('video')) {
            el = $(element);
        } else {
            el = $(element).find('video');
        }

        el.get(0).play();
    });

    osVideo.on('leave', '.to-animate-video', function (element) {
        var el;

        if ($(element).is('video')) {
            el = $(element);
        } else {
            el = $(element).find('video');
        }

        el.get(0).pause();
    });

    window.setTimeout(function () {
        if ($('.gallery').length > 0) {
            var current = $('.gallery').attr('data-current-slide');
            $('.gallery').find('[data-slide=' + current+']')
                .addClass('slide-in')
                .addClass('slide-index');
        }
    }, 1500);

    if ($('body').hasClass('main')) {
        window.setTimeout(function () {
            $('body').addClass('page-loaded');
            $('.parallax-window').parallax({imageSrc: './images/picture_main_large.jpg'});
        }, 1750);
    } else {
        window.setTimeout(function () {
            $('body').addClass('page-loaded');
        }, 750);        
    }

    $('.menu-toggle').on('click', function (event) {        
        var windowHeight = $(window).height(),
            shift = getTopShift();

        event.preventDefault();
        event.stopPropagation();

        if (!$('body').hasClass('menu-active')) {
            animatedHeight = $('.animated-screen').height()

            $('body').addClass('menu-active');

            window.setTimeout(function () {
                $('body').addClass('menu-in');

            }, 1000);            

            window.setTimeout(function () {
                $('body').addClass('menu-active-hide');
                $('.animated-screen').height(windowHeight);
            }, 500);
        }
    });

    $('.popup__close').click(function (event) {
        event.preventDefault();
        event.stopPropagation();

        if ($(this).attr('data-action')) {
            hideMenuPopup();
        } else {
            if (!$('body').hasClass('menu-out')) {
                hidePopup();
            }
        }
    });

    $('.feedback__form__button-close').click(function() {
        hidePopup();
    });

    $('body').click(function (event) {
        hidePopup();
    });
    
    $('.popup__feedback__content').click(function(event) {
        event.stopPropagation();
    });

    $(document).keyup(function (event) {
        if (event.keyCode === 27) {
            hidePopup();
        }
    });


    $('.menu-active').on('touchmove', function (event) {
        event.preventDefault();
    });

    $('.open-popup').click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        
        var scrollbarWidth = getScrollbarWidth(),
            popupName = $(this).attr('data-popup'),
            popup = $('.' + popupName),
            initialHeight;

        $('body').addClass('popup-active');
        
        popup.fadeIn(150);

        initialHeight = popup.find('.feedback__form-initial').height();
        popup.find('.feedback__form-sended').height(initialHeight);

        timeout = window.setTimeout(function () {
            popup.addClass('popup-animated');
        }, 150);

        if (scrollbarWidth > 0) {
            $('body').css('padding-right', scrollbarWidth);
        }
    });

    $('.feedback__form-initial .feedback__form__button .btn').on('click', function(event) {
    	yaCounter47028606.reachGoal ('inclub_final'); 
        sendForm(event.target);
        return true;
    });
    
    $('.feedback__form-initial form#sendToCRM .feedback__form__button .btn').on('click', function(event) {
		$('form#sendToCRM').submit();	
	});
	
	$('.feedback__form-initial form#sendToCRM_buy .feedback__form__button .btn').on('click', function(event) {
		$('form#sendToCRM_buy').submit();	
	});
	
	$('.feedback__form-initial form#sendToCRM_reg .feedback__form__button .btn').on('click', function(event) {
		$('form#sendToCRM_reg').submit();	
	});
		
    $('.feedback__form-initial input').keypress(function (event) {
        if (event.which == 13) {
            sendForm(event.target);
        }
    });

    $('.prev-slide').click(function () {
        if (!$(this).hasClass('is-active')){
            $('.gallery__navigation__button').addClass('is-active');
            showPrevSlide();
        }
    });

    $('.next-slide').click(function () {
        if (!$(this).hasClass('is-active')){
            $('.gallery__navigation__button').addClass('is-active');
            showNextSlide();
        }
    });


    function hidePopup() {
        popup = $('.popup');

        popup.addClass('popup-closed');

        timeout = window.setTimeout(function () {
            $('body')
                .removeClass('popup-active')
                .css('padding-right', 0);

                clearPopup();
                popup.fadeOut(150);

        }, 1350); 
    }

    function clearPopup() {
        var popup = $('.popup');

        popup
            .removeClass('popup-animated')
            .removeClass('popup-sended')
            .removeClass('popup-closed');

        popup.find('input').val('');
    }

    function hideMenuPopup() {
        var menuPopup = $('.menu-popup');
        
        $('body')
            .removeClass('menu-active-hide')
            .removeClass('menu-in')
            .addClass('menu-out');
            
            if ($('body').hasClass('price')) {
                $('.animated-screen').height('auto');
            } else {
                window.setTimeout(function () {
                    $('.animated-screen').height(animatedHeight);
                }, 1000);
            }
        

        window.setTimeout(function () {
            menuPopup.hide();
            
            $('body')
                .removeClass('menu-out')
                .removeClass('menu-active');
            
            menuPopup
                .show()
                .animate({
                    scrollTop: 0
                }, 0);
        
        }, 1000);
    }

    function getTopShift() {
        return parseInt($('.content__border').css('margin-top'));
    }


    function initNavigationFixed() {
        $('.navigation-fixed').append($('.navigation-static').html());
    }

    function setNavigationPos () {
        var back = $('.gallery__slide__person__back'),
            backPos = back.position().top,
            backHeight = back.height();
        
        $('.gallery__navigation').css({
            top: backPos + backHeight
        });
    }

    function setHeight () {
        var windowHeight = $(window).height(),
            windowWidth = $(window).width(),
            topShift = getTopShift(),
            personShift = parseInt($('.gallery__slide__person__img').css('margin-top')),
            minHeight,
            height;

        $('.gallery__slide__person__img').height(windowHeight - topShift - personShift);
        
        if (windowWidth >= breakpoints[0]) {
            height = windowHeight - topShift;            
            $('.viewport-screen').height(height);
        } else {
            height = $('.gallery__slide__person').outerHeight() + $('.gallery__slide__content').outerHeight() + 55;
        }

        $('.menu-popup').height(windowHeight);

        if (parseInt($('.menu-popup__content').css('min-height')) === 0 || windowHeight > menuPopupMinHeight) {
            $('.menu-popup__content').css('min-height', windowHeight);
        } else if (windowHeight <= menuPopupMinHeight) {
            $('.menu-popup__content').css('min-height', menuPopupMinHeight);
        }

        $('.gallery').height(height);
    
    }

    function hasScrolled(container) {
        var st = container ? container.scrollTop() : $(this).scrollTop(),
            navigation = $('.navigation-static'),
            navigationFixed = $('.navigation-fixed'),
            navTop = parseInt(navigation.css('top')),
            topShift = getTopShift();
        
        if (Math.abs(lastScrollTop - st) <= delta) {
            return;
        }

        if (st > lastScrollTop) {
            if (st > navbarHeight) {
                $('body').removeClass('nav-down').addClass('nav-up');
            }
        } else {
            if(st + $(window).height() < $(document).height()) {
                $('body').removeClass('nav-up').addClass('nav-down');
            }
        }

        if (st > navbarHeight) {
            navigation.hide();
            navigationFixed.show();

        } else if (st <= navbarHeight - navigation.outerHeight() || st <= delta + navTop / 4 + topShift) {
            $('body').removeClass('nav-down').addClass('nav-up');
            navigation.show();
            //navigationFixed.hide();
        }
        
        lastScrollTop = st;
    }

    function startCarousel() {
        if (carouselInterval) {
            window.clearInterval(carouselInterval);
        }

        carouselInterval = window.setInterval(function () {
            showNextSlide();
        }, 5000)
    }

    function showNextSlide () {
        var gallery = $('.gallery'),
            current = parseInt(gallery.attr('data-current-slide')),
            next = (current) % 3  + 1,
            currentSlide = gallery.find('[data-slide=' + current + ']'),
            nextSlide = gallery.find('[data-slide=' + next + ']');

        if (carouselInterval) {
            window.clearInterval(carouselInterval);
        }

        gallery.addClass('slide-change');
        currentSlide.addClass('slide-out');
        nextSlide.addClass('slide-in');
        
        window.setTimeout(function () {
            $('.gallery__cover').hide();
            gallery.removeClass('slide-change');
        }, 1000);

        window.setTimeout(function () {
            nextSlide.addClass('slide-index');
        }, 400);

        window.setTimeout(function () {
            currentSlide.css('opacity', 0);
            currentSlide.removeClass('slide-index');
            currentSlide.removeClass('slide-in');
            currentSlide.removeClass('slide-out');
        }, 1200);


        window.setTimeout(function () {
            $('.gallery__cover').show();
            currentSlide.removeAttr('style');
            $('.gallery__navigation__button').removeClass('is-active');
            startCarousel();
        }, 1800);

        gallery.attr('data-current-slide', next);
    }


    function showPrevSlide () {
        var gallery = $('.gallery'),
            current = parseInt(gallery.attr('data-current-slide')),
            prev = (current - 1) % 3 === 0 ? 3 : (current - 1) % 3,
            currentSlide = gallery.find('[data-slide=' + current + ']'),
            prevSlide = gallery.find('[data-slide=' + prev + ']');

        if (carouselInterval) {
            window.clearInterval(carouselInterval);
        }

        gallery.addClass('slide-change');
        currentSlide.addClass('slide-out');
        prevSlide.addClass('slide-in');
        
        window.setTimeout(function () {
            $('.gallery__cover').hide();
            gallery.removeClass('slide-change');
        }, 1000);

        window.setTimeout(function () {
            prevSlide.addClass('slide-in');
        }, 400);

        window.setTimeout(function () {
            currentSlide.css('opacity', 0);
            currentSlide.removeClass('slide-in');
            currentSlide.removeClass('slide-out');
        }, 1200);

        window.setTimeout(function () {
            $('.gallery__cover').show();
            currentSlide.removeAttr('style');
            $('.gallery__navigation__button').removeClass('is-active');
            startCarousel();
        }, 1800);

        gallery.attr('data-current-slide', prev);
    }


    function getScrollbarWidth () {
        var outer = document.createElement("div");

        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar";
        document.body.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;
        // force scrollbars
        outer.style.overflow = "scroll";

        // add innerdiv
        var inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);        

        var widthWithScroll = inner.offsetWidth;

        // remove divs
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;

    }

    function updateVideoPopup() {
        var windowWidth = $(window).width(),
            windowHeight = $(window).height(),
            wrapper = $('.YouTubePopUp-Wrap'),
            wrapperPaddingLeft = parseInt(wrapper.css('padding-left')),
            wrapperPaddingTop = parseInt(wrapper.css('padding-top')),
            width,newWidth,
            height, newHeight,
            content,
            close;
        

        if (wrapper.length > 0) {
            content = wrapper.find('.YouTubePopUp-Content');
            close = wrapper.find('.YouTubePopUp-Close');

            if (close) {
                close.html('');
                close.append($('.close__block').clone());
            }
            content.append($('.clear-loading__block').clone());

            width = wrapper.width();
            height = wrapper.height();

            newWidth = height * 1.78;
            newHeight = width / 1.78;

            if (windowWidth >= newWidth + wrapperPaddingLeft * 2) {
                content.css({
                    'width': newWidth,
                    'height': height,
                    'margin-top': parseInt((windowHeight - height) / 2) - wrapperPaddingTop
                });
            } else {
                content.css({
                    'width': width,
                    'height': newHeight,
                    'margin-top': parseInt((windowHeight - newHeight) / 2) - wrapperPaddingTop
                });
            }
        }
    }

    /** FORMS **/
    function phoneIsValid (v) {
        var r = /^[+][0-9][ ]\(?([0-9]{3})\)?[ ]?([0-9]{3})[-]?([0-9]{2})[-]?([0-9]{2})$/;
        return (v.match(r) == null) ? false : true;
    }

    function sendForm (element) {
        var popup = $(element).closest('.popup'),
            form = popup.find('.feedback__form'),
            cover = popup.find('.popup__feedback__content__cover'),
            type = popup.attr('data-type'),
            nameForm = form.find('.feedback__form__input-name'),
            name = nameForm.val() || '',
            phoneForm = form.find('.feedback__form__input-phone'),
            phone = phoneForm.val() || '';

        if (form.hasClass('form-is-failed')) {
            form.removeClass('form-is-failed');
            $('.feedback__form__phone').removeClass('phone-is-failed');
            $('.feedback__form__name').removeClass('name-is-failed');
        }

        if (name.length > 0 && phone.length > 0 && phoneIsValid(phone)) {                
            
            popup.addClass('popup-cover');
            window.setTimeout(function () {
                popup.addClass('popup-sended');
            }, 250);
            
            window.setTimeout(function () {
                cover.hide();
                popup.removeClass('popup-cover');
            }, 600);

            window.setTimeout(function () {
                cover.show();
            }, 1200);

            $.ajax({
                type: "POST",
                url: "mail/send.php",
                data: {
                    name: name,
                    phone: phone,
                    type: type
                },
                success: function(data) {
                    form.removeClass('form-is-failed');
                    form.addClass('form-is-sended');
                    
                    form.find('input').blur();

                    if (phone.length > 0 && $('.phone-sended').length > 0) {
                        $('.phone-sended').html(phone);
                    }
                },
                error: function (data) {}
            });
        } else if (name.length === 0 || phone.length === 0 || phone.length > 0 && !phoneIsValid(phone)) {
            form.addClass('form-is-failed');
                
            if (phone.length === 0 || phone.length > 0 && !phoneIsValid(phone)) {
                $('.feedback__form__phone').addClass('phone-is-failed');
            }

            if (name.length === 0) {
                $('.feedback__form__name').addClass('name-is-failed');
            }

            window.setTimeout(function () {
                form.removeClass('form-is-failed');
                $('.feedback__form__phone').removeClass('phone-is-failed');
                $('.feedback__form__name').removeClass('name-is-failed');
            }, 3500);
        }
    }

    $('.feedback-more').on('click', function (event) {
        event.preventDefault();

        var popup = $(this).closest('.popup'),
            form = popup.find('.feedback__form'),
            cover = popup.find('.popup__feedback__content__cover');


        form.find('input').val('');

        popup.addClass('popup-cover');
        
        window.setTimeout(function () {
            popup.removeClass('popup-sended');
        }, 250);
        
        window.setTimeout(function () {
            cover.hide();
            popup.removeClass('popup-cover');
        }, 600);

        window.setTimeout(function () {
            cover.show();
        }, 1200);
                
    });

});