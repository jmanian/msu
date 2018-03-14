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
				//do nothing
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
