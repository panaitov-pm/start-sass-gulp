jQuery(document).ready(function($) {
	$('#slick-home').slick({
		arrows:true,
		dots:true,
		nextArrow:'<span class="arrow-next"><img src="/img/slider-arrow.png"></span>',
		prevArrow:'<span class="arrow-prev"><img src="/img/slider-arrow.png"></span>'
	});

	$('#slider-manufacturers').slick({
		arrows:true,
		dots:false,
		slidesToShow: 6,
		slidesToScroll: 6,
		customPaging:0,
		nextArrow:'<span class="arrow-next2"><img src="/img/slider-arrow.png"></span>',
		prevArrow:'<span class="arrow-prev2"><img src="/img/slider-arrow.png"></span>'
	});

	$('.filters select').selectpicker({
		size: 4
	});


	
});