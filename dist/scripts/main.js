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
		'https://res.cloudinary.com/ddkucvkg0/video/upload/v1531767271/steam/dld-theme.mp3',
    'https://res.cloudinary.com/ddkucvkg0/video/upload/v1531767272/steam/donut-theme.mp3',
    'https://res.cloudinary.com/ddkucvkg0/video/upload/v1532114084/steam/inbox-detox.mp3',
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

var ProductsSection = (function() {

  var positionData = {
    sectionOne: 0,
    sectionTwo: 0,
    sectionThree: 0,
  };

	function init() {
    $(window).scroll(function() {
      if(positionData.sectionOne === 0) {
        setPositionData();
      }
      runEffect();
    });
    
    $(window).resize(function() {
      setPositionData();
    });
    
		registerHandlers();
	}

	function registerHandlers() {
		$('.trigger-contact').click(function() {
			var select = $(this).data('selectval');
      scrollToForm();
      $('#request').val(select);
      $('#name').focus();
    });
    
    $('.yt-async').click(function() {
      loadYoutubeAsync(this);
    });
	}

	function scrollToForm(hash) {
		$('html, body').animate({
			scrollTop: $('#contact-form').offset().top - 50
		}, 800);
	}

	function runEffect() {
    var ypos = $(window).scrollTop();
    var inSectionOne = ypos > positionData.sectionOne && ypos <= positionData.sectionTwo;
    var inSectionTwo = ypos > positionData.sectionTwo && ypos <= positionData.sectionThree;
    var inSectionThree = ypos > positionData.sectionThree;

    if(inSectionOne) {
      updateProductSectionStyling('#fff');
    } else if(inSectionTwo) {
      updateProductSectionStyling('#4586ff');
    } else if(inSectionThree) {
      updateProductSectionStyling('#16135a');
    }
  }

  function updateProductSectionStyling(color) {
    $('.products').css('background', color);
    $('.products .product-button').css('color', color);
  }
  
  function loadYoutubeAsync(el) {
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", "https://www.youtube.com/embed/" + el.dataset.video + el.dataset.params);
    iframe.style.width = 315;
    iframe.style.height = 560;
    el.parentNode.replaceChild(iframe, el);
  }

  function setPositionData() {
    positionData.sectionOne = $('.jingles').offset().top - (ScreenData.height/3);
    positionData.sectionTwo = $('.gigs').offset().top - (ScreenData.height/3);
    positionData.sectionThree = $('.art').offset().top - (ScreenData.height/3);
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
	ProductsSection.init();
	AudioPlayer.init();

	//copyright year
	$('#year').replaceWith(new Date().getFullYear());
});
