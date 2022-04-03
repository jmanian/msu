import { initAudioPlayer } from './AudioPlayer';
import { initProductSection } from './ProductsSection';
import { initTeamSection } from './TeamSection';

window.addEventListener('load', () => {
	ScreenData = {
		height: window.innerHeight,
		width: window.innerWidth,
		isSmall: () => ScreenData.width < 768,
	}
	
	window.onresize = () => {
		ScreenData.height = window.innerHeight;
		ScreenData.width = window.innerWidth;
	};

	initTeamSection();
	initProductSection();
	initAudioPlayer();

	//copyright year
	document.getElementById('year').textContent = new Date().getFullYear();
});
