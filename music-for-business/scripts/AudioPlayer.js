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
	'https://res.cloudinary.com/ddkucvkg0/video/upload/v1520636718/steam/guru.mp3',
	'https://res.cloudinary.com/ddkucvkg0/video/upload/v1520636716/steam/spacious.mp3',
];

function initAudioPlayer() {
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

export { initAudioPlayer };