$(document).ready(function() {
	//init fns
	ScreenData.init();
	TeamSection.init();
	ConnectSection.init();
	ProductsSection.init();
	AudioPlayer.init();
	// Nav.init();

	//copyright year
	$('#year').replaceWith(new Date().getFullYear());
});
