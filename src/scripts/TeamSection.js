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
