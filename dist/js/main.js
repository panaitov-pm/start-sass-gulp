//= ../bootstrap-sass/assets/javascripts/bootstrap.js

jQuery(document).ready(function($) {
	//анимация высоты главного меню
	$("a.show_all_menu").on('click', function(event) {
		event.preventDefault();
		$('.main_nav').toggleClass('animate-height');

	});

	// карусель продуктов на главной
	$('#carousel-specials,#carousel-hits').slick({
		slidesToShow: 4,
		slidesToScroll: 4,
		initialSlide:0,
		prevArrow:'<button class="slick-arrow-l"><i class="icon icon-arrow"></i></button>',
		nextArrow:'<button class="slick-arrow-r"><i class="icon icon-arrow"></i></button>',
		responsive: [{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,


			}

		}, {

			breakpoint: 990,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,


			}

		}, {

			breakpoint: 768,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
				arrows:true,

				
			}

		},{ 

			breakpoint: 713,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
				arrows:false,

				vertical:true,
					}

		}]
	});

	$('.specials-item img').addClass('hvr-grow-rotate');

	// $('select').select2();

   // $( ".custom-input" ).checkboxradio();

}); 

jQuery(document).ready(function($) {
	// табы
	$('[data-tab="header"] a').on('click', function(event) {
		event.preventDefault();
		var activeBody=$(this).attr('href');
		$('[data-tab="header"] a').each(function(index, el) {
			$(el).removeClass('active');
		});
		$(this).addClass('active');
		$('[data-tab="body"]').each(function(index, el) {
			$(el).removeClass('active');
		});
		$(activeBody).addClass('active');
	});

});
$('[data-action="add-slide"]').on('click', function(){

	var ell=$(this).data('element');
	console.log(ell);
	$(ell).slick('slickNext');
});


jQuery(function () {
    jQuery('.table').footable({
       
        breakpoints: {
            mobile: 0,
            tablet: 720,
            desktop: 1024
        }
    });
})