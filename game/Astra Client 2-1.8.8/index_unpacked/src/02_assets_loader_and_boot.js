
"use strict";
(function(){
	window.eaglercraftXOpts.assetsURI = "data:application/octet-stream;base64,<<EXTRACTED to assets_out/ and lang_out/>>";

	var launchInterval = -1;
	var launchCounter = 1;
	var launchCountdownNumberElement = null;
	var launchCountdownProgressElement = null;
	var launchSkipCountdown = false;

	var launchTick = function() {
		launchCountdownNumberElement.innerText = "" + Math.floor(6.0 - launchCounter * 0.06);
		launchCountdownProgressElement.style.width = "" + launchCounter + "%";
		if(++launchCounter > 100 || launchSkipCountdown) {
			clearInterval(launchInterval);
			setTimeout(function() { document.body.removeChild(document.getElementById("launch_countdown_screen")); document.body.style.backgroundColor = "black"; main(); }, 50);
		}
	};

	window.addEventListener("load", function() {
		launchCountdownNumberElement = document.getElementById("launchCountdownNumber");
		launchCountdownProgressElement = document.getElementById("launchCountdownProgress");
		launchInterval = setInterval(launchTick, 50);
		document.getElementById("skipCountdown").addEventListener("click", function() {
			launchSkipCountdown = true;
		});
	});
})();
