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
