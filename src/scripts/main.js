$(document).ready(function() {
	init();
});

var bodyHeight;

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
}



$(window).scroll(function() {
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
});
