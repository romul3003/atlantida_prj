$(document).ready(function(){
  $('.slider').slick({
    adaptiveHeight: true,
    dots: true,
    accessibility: true,
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
});
