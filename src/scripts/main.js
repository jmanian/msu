$(document).ready(function() {
	Steam.init();
});

$(window).scroll(function() {
	Steam.initInstagramScrollEffect();
	Steam.displayNav();
});

$(window).resize(function() {
	Steam.setConnectSectionValues();
	Steam.setNavValues();
});

var Steam = (function() {

	var nav = {
		visible: false,
		top: 0,
		sections: {},
		currentSection: 0
	};

	function init() {
		$.ajax({
			url: 'https://www.instagram.com/mobilesteamunit/?__a=1',
			type: 'GET',
			dataType: 'json',
			success: processInstagramData,
			error: function(a,b,c) {
				//do nothing
			}
		});

		setNavValues();

		setYear();
	}

	function processInstagramData(data) {
		var images = data.user.media.nodes;
		var output = '';

		for(var i=0; i<images.length; i++) {
			var img = images[i].thumbnail_src;

			if(i%6===0) {
				if(i!==0) output += '</div>'
				if(i!==images.length) output += '<div class="steamfeed__row">';
			}

			output += '<div class="steamfeed__img"><img src="'+img+'" alt="" /></div>';
		}

		$('#steamfeed').append(output);
		setConnectSectionValues();
	}

	function initInstagramScrollEffect() {
		var wHeight = $(window).height();
		var yPos = $(window).scrollTop();
		var steamPos = $('#steamfeed').offset();
		var stop = steamPos.top + wHeight;
		var start = steamPos.top - wHeight;

		if(yPos>=start && yPos<stop ) {
			var increment = 400 / (stop-start);
			var move = (increment * (yPos-start));
			$('.steamfeed').css({
				transform: 'translateX('+move+'px)'
			});
		}
	}

	function displayNav() {
		var yPos = $(window).scrollTop();

		// if(yPos >= nav.top && !nav.visible) {
		// 	nav.visible = true;
		// 	$('#nav').addClass('active');
		// } else if(yPos < nav.top && nav.visible) {
		// 	nav.visible = false;
		// 	$('#nav').removeClass('active');
		// }


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
			case yPos>=nav.sections.fourth && yPos<nav.sections.fifth && nav.currentSection != 3:
				updateNav(3);
				break;
			case yPos>=nav.sections.fifth && nav.currentSection != 4:
				updateNav(4);
				break;
		}
	}

	function updateNav(newSection) {
		nav.currentSection = newSection;
		var translate = newSection*-40;
		$('.nav__links').css({
			'-webkit-transform' : 'translateY(' + translate + 'px)',
			'-moz-transform'    : 'translateY(' + translate + 'px)',
			'-ms-transform'     : 'translateY(' + translate + 'px)',
			'-o-transform'      : 'translateY(' + translate + 'px)',
			'transform'         : 'translateY(' + translate + 'px)'
		});
	}

	function setConnectSectionValues() {
		var newHeight = ($('.steamfeed__img').width() * 2) + 30;
		var halfContent = $('.connect__content').height() / 2;
		$('.connect').css('height', newHeight+'px');
		$('.connect__content').css('padding-top', ((newHeight/2) - halfContent)+'px');
	}

	function setNavValues() {
		nav.top = nav.sections.first = $('#story').offset().top - 50;
		nav.sections.second = $('#products').offset().top - 50;
		nav.sections.third = $('#testimonials').offset().top - 50;
		nav.sections.fourth = $('#connect').offset().top - 50;
		nav.sections.fifth = $('#team').offset().top - 50;
	}

	function setYear() {
		var d = new Date();
		$('#year').html(d.getFullYear());
	}

	return {
		init: init,
		initInstagramScrollEffect: initInstagramScrollEffect,
		displayNav: displayNav,
		setConnectSectionValues: setConnectSectionValues,
		setNavValues: setNavValues
	}

})();
