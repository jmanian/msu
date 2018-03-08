$(document).ready(function() {
	//init fns
	ScreenData.init();
	TeamSection.init();
	InstagramEffect.init();
	ProductsBackgroundEffect.init();
	AudioPlayer.init();

	//copyright year
	$('#year').replaceWith(new Date().getFullYear());
});
