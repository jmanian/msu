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
		'dist/assets/audio-test.mp3',
		'dist/assets/sorry.mp3',
		'dist/assets/cyberattack.mp3',
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
var ProductsBackgroundEffect = (function() {

	function init() {
		$(window).scroll(function() {
			runEffect();
		});
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

// Generated by CoffeeScript 1.9.3
(function(){var e;e=function(){function e(e,t){var n,r;this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1};if(typeof e=="object")for(n in e)r=e[n],this.options[n]=r;this.context=t!=null?t:this,this.unique=this._genKey()}return e.prototype.hasNext=function(){return typeof this.context.nextUrl=="string"&&this.context.nextUrl.length>0},e.prototype.next=function(){return this.hasNext()?this.run(this.context.nextUrl):!1},e.prototype.run=function(t){var n,r,i;if(typeof this.options.clientId!="string"&&typeof this.options.accessToken!="string")throw new Error("Missing clientId or accessToken.");if(typeof this.options.accessToken!="string"&&typeof this.options.clientId!="string")throw new Error("Missing clientId or accessToken.");return this.options.before!=null&&typeof this.options.before=="function"&&this.options.before.call(this),typeof document!="undefined"&&document!==null&&(i=document.createElement("script"),i.id="instafeed-fetcher",i.src=t||this._buildUrl(),n=document.getElementsByTagName("head"),n[0].appendChild(i),r="instafeedCache"+this.unique,window[r]=new e(this.options,this),window[r].unique=this.unique),!0},e.prototype.parse=function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D;if(typeof e!="object"){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(e.meta.code!==200){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,e.meta.error_message),!1;throw new Error("Error from Instagram: "+e.meta.error_message)}if(e.data.length===0){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}this.options.success!=null&&typeof this.options.success=="function"&&this.options.success.call(this,e),this.context.nextUrl="",e.pagination!=null&&(this.context.nextUrl=e.pagination.next_url);if(this.options.sortBy!=="none"){this.options.sortBy==="random"?M=["","random"]:M=this.options.sortBy.split("-"),O=M[0]==="least"?!0:!1;switch(M[1]){case"random":e.data.sort(function(){return.5-Math.random()});break;case"recent":e.data=this._sortBy(e.data,"created_time",O);break;case"liked":e.data=this._sortBy(e.data,"likes.count",O);break;case"commented":e.data=this._sortBy(e.data,"comments.count",O);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}}if(typeof document!="undefined"&&document!==null&&this.options.mock===!1){m=e.data,A=parseInt(this.options.limit,10),this.options.limit!=null&&m.length>A&&(m=m.slice(0,A)),u=document.createDocumentFragment(),this.options.filter!=null&&typeof this.options.filter=="function"&&(m=this._filter(m,this.options.filter));if(this.options.template!=null&&typeof this.options.template=="string"){f="",d="",w="",D=document.createElement("div");for(c=0,N=m.length;c<N;c++){h=m[c],p=h.images[this.options.resolution];if(typeof p!="object")throw o="No image found for resolution: "+this.options.resolution+".",new Error(o);E=p.width,y=p.height,b="square",E>y&&(b="landscape"),E<y&&(b="portrait"),v=p.url,l=window.location.protocol.indexOf("http")>=0,l&&!this.options.useHttp&&(v=v.replace(/https?:\/\//,"//")),d=this._makeTemplate(this.options.template,{model:h,id:h.id,link:h.link,type:h.type,image:v,width:E,height:y,orientation:b,caption:this._getObjectProperty(h,"caption.text"),likes:h.likes.count,comments:h.comments.count,location:this._getObjectProperty(h,"location.name")}),f+=d}D.innerHTML=f,i=[],r=0,n=D.childNodes.length;while(r<n)i.push(D.childNodes[r]),r+=1;for(x=0,C=i.length;x<C;x++)L=i[x],u.appendChild(L)}else for(T=0,k=m.length;T<k;T++){h=m[T],g=document.createElement("img"),p=h.images[this.options.resolution];if(typeof p!="object")throw o="No image found for resolution: "+this.options.resolution+".",new Error(o);v=p.url,l=window.location.protocol.indexOf("http")>=0,l&&!this.options.useHttp&&(v=v.replace(/https?:\/\//,"//")),g.src=v,this.options.links===!0?(t=document.createElement("a"),t.href=h.link,t.appendChild(g),u.appendChild(t)):u.appendChild(g)}_=this.options.target,typeof _=="string"&&(_=document.getElementById(_));if(_==null)throw o='No element with id="'+this.options.target+'" on page.',new Error(o);_.appendChild(u),a=document.getElementsByTagName("head")[0],a.removeChild(document.getElementById("instafeed-fetcher")),S="instafeedCache"+this.unique,window[S]=void 0;try{delete window[S]}catch(P){s=P}}return this.options.after!=null&&typeof this.options.after=="function"&&this.options.after.call(this),!0},e.prototype._buildUrl=function(){var e,t,n;e="https://api.instagram.com/v1";switch(this.options.get){case"popular":t="media/popular";break;case"tagged":if(!this.options.tagName)throw new Error("No tag name specified. Use the 'tagName' option.");t="tags/"+this.options.tagName+"/media/recent";break;case"location":if(!this.options.locationId)throw new Error("No location specified. Use the 'locationId' option.");t="locations/"+this.options.locationId+"/media/recent";break;case"user":if(!this.options.userId)throw new Error("No user specified. Use the 'userId' option.");t="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return n=e+"/"+t,this.options.accessToken!=null?n+="?access_token="+this.options.accessToken:n+="?client_id="+this.options.clientId,this.options.limit!=null&&(n+="&count="+this.options.limit),n+="&callback=instafeedCache"+this.unique+".parse",n},e.prototype._genKey=function(){var e;return e=function(){return((1+Math.random())*65536|0).toString(16).substring(1)},""+e()+e()+e()+e()},e.prototype._makeTemplate=function(e,t){var n,r,i,s,o;r=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,n=e;while(r.test(n))s=n.match(r)[1],o=(i=this._getObjectProperty(t,s))!=null?i:"",n=n.replace(r,function(){return""+o});return n},e.prototype._getObjectProperty=function(e,t){var n,r;t=t.replace(/\[(\w+)\]/g,".$1"),r=t.split(".");while(r.length){n=r.shift();if(!(e!=null&&n in e))return null;e=e[n]}return e},e.prototype._sortBy=function(e,t,n){var r;return r=function(e,r){var i,s;return i=this._getObjectProperty(e,t),s=this._getObjectProperty(r,t),n?i>s?1:-1:i<s?1:-1},e.sort(r.bind(this)),e},e.prototype._filter=function(e,t){var n,r,i,s,o;n=[],r=function(e){if(t(e))return n.push(e)};for(i=0,o=e.length;i<o;i++)s=e[i],r(s);return n},e}(),function(e,t){return typeof define=="function"&&define.amd?define([],t):typeof module=="object"&&module.exports?module.exports=t():e.Instafeed=t()}(this,function(){return e})}).call(this);
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

			$(window).resize(function() {
				resizeInstagramSection();
			})
		}
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

$(document).ready(function() {
	//init fns
	ScreenData.init();
	TeamSection.init();
	InstagramEffect.init();
	ProductsBackgroundEffect.init();
	AudioPlayer.init();
	// Nav.init();

	//copyright year
	$('#year').replaceWith(new Date().getFullYear());
});
