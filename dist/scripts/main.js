var AudioPlayer = (function() {

	var player = document.getElementById('html5audio');
	var triggerButtonAnimation = true;
	var firstClick = true;
	var bufferInterval;

	var points = {
	  left: {
	    from: '15,0 50,25 50,75 15,100',
	    to: '15,10 40,10 40,90, 15,90'
	  },
	  right: {
	    from: '50,25 85,50 85,50, 50,75',
	    to: '60,10 85,10 85,90, 60,90'
	  }
	};

	var tracks = [
		'https://res.cloudinary.com/ddkucvkg0/video/upload/v1520636718/steam/blue-apron.mp3',
		'https://res.cloudinary.com/ddkucvkg0/video/upload/v1520636718/steam/guru.mp3',
		'https://res.cloudinary.com/ddkucvkg0/video/upload/v1520636716/steam/spacious.mp3',
	];

	function init() {
		registerHandlers();
		registerListeners();
	}

	function registerHandlers() {
		$('#play').on('click', handlePlayButtonClick);
		$('#next').on('click', function() {
			$('#nextanim').get(0).beginElement();
			var track = getCurTrack();
			playTrack(track+1);
		});
		$('#prev').on('click', function() {
			$('#prevanim').get(0).beginElement();
			var track = getCurTrack();
			playTrack(track-1);
		});
		$('.track').on('click', function() {
			var track = parseInt( $(this).data('trackid') );
			playTrack(track);
		});
	}

	function registerListeners() {
		player.addEventListener('pause', function() {
			triggerButtonAnimation = true;
			clearInterval(bufferInterval);
			setPlayButtonState();
		});
		player.addEventListener('play', function() {
			setBufferPosition();
			setPlayButtonState();
		});
		player.addEventListener('ended', function() {
			var track = getCurTrack();
			if(track !== tracks.length-1) {
				playTrack(track+1);
			}
		});
	}

	function playTrack(idx) {
		triggerButtonAnimation = player.paused;

		if(idx >= tracks.length) {
			idx = 0;
		} else if (idx < 0) {
			idx = tracks.length-1;
		}

		$('[data-curtrack]').attr('data-curtrack', idx);
		$('.track').removeClass('active');
		$('[data-trackid="'+idx+'"]').addClass('active');
		player.src = tracks[idx];
		player.load();
		player.play();
	}

	function handlePlayButtonClick() {
		if(isPaused() && firstClick) {
			playTrack(0);
		} else if(isPaused()) {
			player.play();
		} else {
			player.pause();
		}

		firstClick = false;
	}

	function setPlayButtonState() {
		if(triggerButtonAnimation) {
			$('#left').attr({
				from: isPaused() ? points.left.to : points.left.from,
				to: isPaused() ? points.left.from : points.left.to
			}).get(0).beginElement();
			$('#right').attr({
				from: isPaused() ? points.right.to : points.right.from,
				to: isPaused() ? points.right.from : points.right.to
			}).get(0).beginElement();
		}
	}

	function setBufferPosition() {
		var width = $('.audio').outerWidth();
		bufferInterval = setInterval(function() {
			var translate = (player.currentTime / player.duration) * width;

			$('#buffer').css({
				'-webkit-transform' : 'translateX(' + translate + 'px)',
				'-moz-transform'    : 'translateX(' + translate + 'px)',
				'-ms-transform'     : 'translateX(' + translate + 'px)',
				'transform'         : 'translateX(' + translate + 'px)'
			});
		}, 100);

	}

	function getCurTrack() {
		var curTrack = $('[data-curtrack]').attr('data-curtrack');
		return parseInt(curTrack);
	}

	function isPaused() {
	  return player.paused;
	}

	return {
		init: init
	}

})();

var ConnectSection = (function() {

	var instagram = {
		images: [],
		data: null,
		loaded: false,
		loading: false
	};

	function init() {
		if(!ScreenData.isSmall) {
			if(!instagram.loaded && !instagram.loading) {
				loadInstagram();
			}

			$(window).scroll(function() {
				runScrollEffect();
			});
		}

		$(window).resize(function() {
			if(ScreenData.isSmall) {
				$('#connect').css('height', 'auto');
				$('.connect__content').css('padding', '0');
			} else {
				if(!instagram.loaded && !instagram.loading) {
					loadInstagram();
				} else {
					resizeInstagramSection();
				}
			}
		})
	}


	function loadInstagram() {
		instagram.loading = true;
		$.ajax({
			url: 'https://www.instagram.com/mobilesteamunit/?__a=1',
			type: 'GET',
			dataType: 'json',
			success: processinstagram,
			error: function(a,b,c) {
				instagram.loading = false;
				setFallbackImages();
				injectImagesIntoHtml();
			}
		});
	}

	function processinstagram(data) {
		instagram.data = data;
		instagram.loading = false;
		instagram.loaded = true;

		try {
			setImagesFromData();
		} catch (err) {
			setFallbackImages();
		} finally {
			injectImagesIntoHtml();
		}
	}

	function setImagesFromData() {
		var arr = instagram.data.graphql.user.edge_owner_to_timeline_media.edges;
		for(var i=0; i<arr.length; i++) {
			instagram.images.push(arr[i].node.thumbnail_src);
		}
	}

	function setFallbackImages() {
		instagram.images = [
			'https://res.cloudinary.com/ddkucvkg0/image/upload/v1521040658/steam/ig_1.jpg',
			'https://res.cloudinary.com/ddkucvkg0/image/upload/v1521040658/steam/ig_2.jpg',
			'https://res.cloudinary.com/ddkucvkg0/image/upload/v1521040658/steam/ig_3.jpg',
			'https://res.cloudinary.com/ddkucvkg0/image/upload/v1521040658/steam/ig_4.jpg',
			'https://res.cloudinary.com/ddkucvkg0/image/upload/v1521040659/steam/ig_5.jpg',
			'https://res.cloudinary.com/ddkucvkg0/image/upload/v1521040658/steam/ig_6.jpg',
			'https://res.cloudinary.com/ddkucvkg0/image/upload/v1521040658/steam/ig_7.jpg',
			'https://res.cloudinary.com/ddkucvkg0/image/upload/v1521040659/steam/ig_8.jpg',
			'https://res.cloudinary.com/ddkucvkg0/image/upload/v1521040659/steam/ig_9.jpg',
			'https://res.cloudinary.com/ddkucvkg0/image/upload/v1521040659/steam/ig_10.jpg',
			'https://res.cloudinary.com/ddkucvkg0/image/upload/v1521040659/steam/ig_11.jpg',
			'https://res.cloudinary.com/ddkucvkg0/image/upload/v1521040659/steam/ig_12.jpg'
		];
	}

	function injectImagesIntoHtml() {
		var output = '';

		for(var i=0; i<instagram.images.length; i++) {
			var img = instagram.images[i];

			if(i%6===0) {
				if(i!==0) output += '</div>'
				if(i!==instagram.images.length) output += '<div class="steamfeed__row">';
			}

			output += '<div class="steamfeed__img"><img src="'+img+'" alt="" /></div>';
		}

		$('#steamfeed').append(output);
		resizeInstagramSection();
	}

	function runScrollEffect() {
		var yPos = $(window).scrollTop();
		var steamPos = $('#steamfeed').offset();
		var stop = steamPos.top + ScreenData.height;
		var start = steamPos.top - ScreenData.height;

		if(yPos>=start && yPos<stop ) {
			var increment = 400 / (stop-start);
			var move = (increment * (yPos-start));
			$('.steamfeed').css({
				transform: 'translateX('+move+'px)'
			});
		}
	}

	function resizeInstagramSection() {
		var newHeight = ((window.innerWidth + 340) / 6) * 2 + 30;
		$('.connect').css('height', newHeight+'px');
	}

	return {
		init: init,
		runScrollEffect: runScrollEffect
	}

})();

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

var ScreenData = (function() {

	var height = null;
	var isSmall = false;
	var width = null;

	function init() {
		setValues();

		$(window).resize(function() {
			setValues();
		});
	}

	function setValues() {
		ScreenData.height = $(window).height();
		ScreenData.isSmall = $(window).width() < 768;
		ScreenData.width = $(window).width();
	}

	return {
		init: init,
		height: height,
		isSmall: isSmall,
		width: width
	}

})();
var TeamSection = (function() {

	var team;

	function init() {
		team = document.querySelectorAll('.member');
		initScrollWatcher();

		$(window).resize(function() {
			initScrollWatcher();
		});
	}

	function initScrollWatcher() {
		if(ScreenData.isSmall) {
			$(window).scroll(function() {
				initTeamScrollEffect();
			});
		}
	}

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
		return ScreenData.height / 4;
	}


	return {
		init: init
	}

})();

$(document).ready(function() {
	//init fns
	ScreenData.init();
	TeamSection.init();
	ConnectSection.init();
	ProductsSection.init();
	AudioPlayer.init();
	// Nav.init();

	//copyright year
	$('#year').replaceWith(new Date().getFullYear());
});
