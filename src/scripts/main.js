/**************************************************
	LISTENERS
**************************************************/
$(document).ready(function() {
	setScreenData();
	team = document.querySelectorAll('.member');

	if(!screen.isSmall) {
		loadInstagram();
	}
	setYear();
	// setNavValues();
});

$(window).scroll(function() {
	if(!screen.isSmall) {
		initInstagramScrollEffect();
		if(!instagram.loaded && !instagram.loading) {
			loadInstagram();
		}
	} else {
		initTeamScrollEffect();
	}

	initBgScrollEffect();
});

$(window).resize(function() {
	setScreenData();

	if(!screen.isSmall) {
		initInstagramScrollEffect();
		if(!instagram.loaded && !instagram.loading) {
			loadInstagram();
		} else if(!instagram.loading) {
			resizeInstagramSection();
		}
	} else {
		$('#connect').css('height', 'auto');
		$('.connect__content').css('padding', '0');
	}
});



/**************************************************
	GLOBAL VARS
**************************************************/
var team = null;
var screen = {
	height: null,
	isSmall: false,
	width: null
};
var instagram = {
	data: null,
	loaded: false,
	loading: false
};

// var nav = {
// 	visible: false,
// 	top: 0,
// 	sections: {},
// 	currentSection: 0
// };



/**************************************************
	INSTAGRAM SCROLL EFFECT
**************************************************/
function loadInstagram() {
	instagram.loading = true;
	$.ajax({
		url: 'https://www.instagram.com/mobilesteamunit/?__a=1',
		type: 'GET',
		dataType: 'json',
		success: processinstagram,
		error: function(a,b,c) {
			instagram.loading = false;
			//do nothing
		}
	});
}

function processinstagram(data) {
	instagram.data = data;
	instagram.loading = false;
	instagram.loaded = true;
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
	resizeInstagramSection();
}

function initInstagramScrollEffect() {
	var yPos = $(window).scrollTop();
	var steamPos = $('#steamfeed').offset();
	var stop = steamPos.top + screen.height;
	var start = steamPos.top - screen.height;

	if(yPos>=start && yPos<stop ) {
		var increment = 400 / (stop-start);
		var move = (increment * (yPos-start));
		$('.steamfeed').css({
			transform: 'translateX('+move+'px)'
		});
	}
}

function resizeInstagramSection() {
	var newHeight = ($('.steamfeed__img').width() * 2) + 30;
	var halfContent = $('.connect__content').height() / 2;
	$('.connect').css('height', newHeight+'px');
	$('.connect__content').css('padding-top', ((newHeight/2) - halfContent)+'px');
}



/**************************************************
	TEAM SCROLL EFFECT
**************************************************/
function initTeamScrollEffect() {
	for(var i=0; i<team.length; i++) {
		var member = team[i];
		if(!$(member).hasClass('hovered') && member.getBoundingClientRect().top < teamTriggerPoint()) {
			$(member).addClass('hovered')
		} else if($(member).hasClass('hovered') && member.getBoundingClientRect().top >= teamTriggerPoint()) {
			$(member).removeClass('hovered');
		}
	}
}

function teamTriggerPoint() {
	return screen.height / 4;
}



/**************************************************
	NAV SCROLL EFFECT
**************************************************/
// function displayNav() {
// 	var yPos = $(window).scrollTop();

// 	switch(true) {
// 		case yPos>=nav.top && !nav.visible:
// 			nav.visible = true;
// 			$('#nav').addClass('active');
// 			break;
// 		case yPos<nav.top && nav.visible:
// 			nav.visible = false;
// 			$('#nav').removeClass('active');
// 			break;
// 		case yPos>=nav.sections.first && yPos<nav.sections.second && nav.currentSection != 0:
// 			updateNav(0);
// 			break;
// 		case yPos>=nav.sections.second && yPos<nav.sections.third && nav.currentSection != 1:
// 			updateNav(1);
// 			break;
// 		case yPos>=nav.sections.third && yPos<nav.sections.fourth && nav.currentSection != 2:
// 			updateNav(2);
// 			break;
// 		case yPos>=nav.sections.fourth && yPos<nav.sections.fifth && nav.currentSection != 3:
// 			updateNav(3);
// 			break;
// 		case yPos>=nav.sections.fifth && nav.currentSection != 4:
// 			updateNav(4);
// 			break;
// 	}
// }

// function updateNav(newSection) {
// 	nav.currentSection = newSection;
// 	var translate = newSection*-40;
// 	$('.nav__links').css({
// 		'-webkit-transform' : 'translateY(' + translate + 'px)',
// 		'-moz-transform'    : 'translateY(' + translate + 'px)',
// 		'-ms-transform'     : 'translateY(' + translate + 'px)',
// 		'-o-transform'      : 'translateY(' + translate + 'px)',
// 		'transform'         : 'translateY(' + translate + 'px)'
// 	});
// }

// function setNavValues() {
// 	nav.top = nav.sections.first = $('#story').offset().top - 50;
// 	nav.sections.second = $('#products').offset().top - 50;
// 	nav.sections.third = $('#testimonials').offset().top - 50;
// 	nav.sections.fourth = $('#connect').offset().top - 50;
// 	nav.sections.fifth = $('#team').offset().top - 50;
// }



/**************************************************
	BG SCROLL EFFECT
**************************************************/
function initBgScrollEffect() {
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


/**************************************************
	HELPER FUNCTIONS
**************************************************/
function setYear() {
	var d = new Date();
	$('#year').replaceWith(d.getFullYear());
}

function setScreenData() {
	screen.height = $(window).height();
	screen.isSmall = $(window).width() < 768;
	screen.width = $(window).width();
}

