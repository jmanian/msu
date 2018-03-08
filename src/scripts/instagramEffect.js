var InstagramEffect = (function() {

	var instagram = {
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
				resizeInstagramSection();
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
		var newHeight = ($('.steamfeed__img').width() * 2) + 30;
		var halfContent = $('.connect__content').height() / 2;
		$('.connect').css('height', newHeight+'px');
		$('.connect__content').css('padding-top', ((newHeight/2) - halfContent)+'px');
	}

	return {
		init: init,
		runScrollEffect: runScrollEffect
	}

})();
