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