var ProductsSection = (function() {

	function init() {
		$(window).scroll(function() {
			runEffect();
		});

		registerHandlers();
	}

	function registerHandlers() {
		$('.trigger-contact').click(function() {
			var select = $(this).data('selectval');
			scrollToForm();
			$('#request').val(select);
		});
	}

	function scrollToForm(hash) {
		$('html, body').animate({
			scrollTop: $('#contact-form').offset().top - 50
		}, 800);
	}

	function runEffect() {
		var yPos = $(window).scrollTop();
		var gigsTop = $('.gigs').offset().top - ($(window).height()/2);
		var musicTop = $('.music').offset().top - ($(window).height()/2);
		var jingleTop = $('.jingles').offset().top - ($(window).height()/2);
		var inGigs = yPos > gigsTop && yPos <= musicTop;
		var inMusic = yPos > musicTop && yPos <= jingleTop;
		var inJingles = yPos > jingleTop;

		switch(true) {
			case inGigs:
				$('.products').css('background', '#4586ff');
				$('.products .product-button').css('color', '#4586ff');
				break;
			case inMusic:
				$('.products').css('background', '#2ac971');
				$('.products .product-button').css('color', '#2ac971');
				break;
			case inJingles:
				$('.products').css('background', '#147F96'); //d57421
				$('.products .product-button').css('color', '#147F96');
				break;
		}
	}

	return {
		init: init
	}

})();
