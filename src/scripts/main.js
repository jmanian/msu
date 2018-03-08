$(document).ready(function() {
	//init fns
	ScreenData.init();
	TeamSection.init();
	InstagramEffect.init();
	ProductsSection.init();
	AudioPlayer.init();
	// Nav.init();

	//copyright year
	$('#year').replaceWith(new Date().getFullYear());
});
