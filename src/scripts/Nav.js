var Nav = (function() {

	var nav = {
		visible: false,
		top: 0,
		sections: {},
		currentSection: 0
	}

	function init() {
		setValues();
		registerListeners();
	}

	function registerListeners() {
		$(window).scroll(function() {
			displayNav();
		});

		$(window).resize(function() {
			setValues();
		})
	}

	function displayNav() {
		var yPos = $(window).scrollTop();

		switch(true) {
			case yPos>=nav.top && !nav.visible:
				nav.visible = true;
				$('#nav').addClass('active');
				break;
			case yPos<nav.top && nav.visible:
				nav.visible = false;
				$('#nav').removeClass('active');
				break;
			case yPos>=nav.sections.first && yPos<nav.sections.second && nav.currentSection != 0:
				updateNav(0);
				break;
			case yPos>=nav.sections.second && yPos<nav.sections.third && nav.currentSection != 1:
				updateNav(1);
				break;
			case yPos>=nav.sections.third && yPos<nav.sections.fourth && nav.currentSection != 2:
				updateNav(2);
				break;
			case yPos>=nav.sections.fourth && nav.currentSection != 3:
				updateNav(3);
				break;
		}
	}

	function updateNav(newSection) {
		nav.currentSection = newSection;
		var translate = newSection*-40;
		$('.nav__link').removeClass('active');
		$('[data-nav-id="'+newSection+'"]').addClass('active');

		$('.nav__links').css({
			'-webkit-transform' : 'translateY(' + translate + 'px)',
			'-moz-transform'    : 'translateY(' + translate + 'px)',
			'-ms-transform'     : 'translateY(' + translate + 'px)',
			'-o-transform'      : 'translateY(' + translate + 'px)',
			'transform'         : 'translateY(' + translate + 'px)'
		});
	}


	function setValues() {
		nav.top = nav.sections.first = $('#products').offset().top - 50;
		nav.sections.second = $('#testimonials').offset().top - 50;
		nav.sections.third = $('#connect').offset().top - 50;
		nav.sections.fourth = $('#team').offset().top - 50;
	}

	return {
		init: init
	}

})();