$(document).ready(function() {
	//init fns
	ScreenData.init();
	TeamSection.init();
	ProductsSection.init();
	AudioPlayer.init();

	//copyright year
	$('#year').replaceWith(new Date().getFullYear());
});
