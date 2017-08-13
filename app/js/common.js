$(document).ready(function(){
  $('.slider').slick({
    adaptiveHeight: true,
    dots: true,
    accessibility: false,
    arrows: false,
    dots: true

    // responsive: [{
    // 	breakpoint: 720,
    		// {
    		// 	slidesToShow: 1
    		// }
    // }]
  });


    $('.categories_menu').tendina({
        speed: 300
    });

    $('.archives_menu').tendina({
        speed: 300
    });


     $(function(){
        $('a.btn_slide').click(function(event){
            if ($(this).hasClass('arrow_left')) 
                $(this).removeClass('arrow_left').addClass('arrow_down');
            else 
                if ($(this).hasClass('arrow_down'))
                    $(this).removeClass('arrow_down').addClass('arrow_left');
            event.preventDefault();
        });     
    }); 

     // carousel
    $(function() {
        var carousel = $('.jcarousel')
        .on('jcarousel:create jcarousel:reload', function() {
            var element = $(this),
                width = element.innerWidth();

                // This shows 1 item at a time.
                // Divide `width` to the number of items you want to display,
                // eg. `width = width / 3` to display 3 items at a time.
                element.jcarousel('items').css('width', width + 'px');
        })
        .jcarousel({
            animation: {
                 duration: 800,
                 easing: 'linear'
            },
            wrap: 'circular'
        })
        .jcarouselAutoscroll({
            interval: 3000,
            target: '+=1',
            autostart: false
        })
        ;

        $('.jcarousel-prev').jcarouselControl({
            target: '-=1',
            carousel: carousel
        });

        $('.jcarousel-next').jcarouselControl({
            target: '+=1',
            carousel: carousel
        });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .on('click', function(e) {
                e.preventDefault();
            })
            .jcarouselPagination({
            'item': function(page, carouselItems) {
                return '<a href="#' + page + '">' + page + '</a>';
            },
            carousel: carousel,
            'perPage': 1
        });

    });

    $('.start_btn').on('click', function(event){
        event.preventDefault();
        var id = $(this).attr('href'), 
        top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1000);
    });

    $('.scroll_to_about_us_section').on('click', function(event){
        event.preventDefault();
        var id = $(this).attr('href'), 
        top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1000);
    });

    $('.scroll_to_services_section').on('click', function(event){
        event.preventDefault();
        var id = $(this).attr('href'), 
        top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1000);
    });


    $('.scroll_to_history_section').on('click', function(event){
        event.preventDefault();
        var id = $(this).attr('href'), 
        top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1000);
    });

    $('.scroll_to_our_team_section').on('click', function(event){
        event.preventDefault();
        var id = $(this).attr('href'), 
        top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1000);
    });

    $('.scroll_to_portfolio_section').on('click', function(event){
        event.preventDefault();
        var id = $(this).attr('href'), 
        top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1000);
    });

    $('.scroll_to_prices_section').on('click', function(event){
        event.preventDefault();
        var id = $(this).attr('href'), 
        top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1000);
    });

     $('.scroll_to_blog_main_section').on('click', function(event){
        event.preventDefault();
        var id = $(this).attr('href'), 
        top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1000);
    });

     $('.scroll_to_footer_section').on('click', function(event){
        event.preventDefault();
        var id = $(this).attr('href'), 
        top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1000);
    });



    // $('#portfolio_gallery').mosaicflow({
    //     minItemWidth: 300,
    //     itemHeightCalculation: "height",
    //     minColumns: 3
    // });


    var $container = $('#portfolio_gallery_container');
    // Инициализация Масонри, после загрузки изображений
        $container.imagesLoaded( function() {
        $container.masonry({
            itemSelector: ".portfolio__image",
            columnWidth: ".portfolio__image-sizer",
            percentPosition: true,
            horizontalOrder: true,

        });
    });

});
