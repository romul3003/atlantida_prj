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

    // $(".btn_slide").click(function(){
    //     $(".categories_item__submenu").slideToggle("slow");
    //     $(this).toggleClass("active"); 
    //     return false;
    // });

    $('.categories_menu').tendina({
        speed: 300
    });

    $('.archives_menu').tendina({
        speed: 300
    });

    // $(function(){
    //     $('a.arrow_left').click(function(event){
    //         $(this).removeClass('arrow_left').addClass('arrow_down');
    //         event.preventDefault();
    //     });     
    // });     

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

    // $( ".header__nav_menu_btn" ).click(function() {
    //     $( ".header__nav_menu" ).slideToggle( "slow", function() {
    // // Animation complete.
    //     });
    // });   

    // $( ".header__nav_menu_btn" ).click(function() {
    //     $( ".header__nav_menu" ).fadeToggle( "slow", "linear");
    // });   


});
