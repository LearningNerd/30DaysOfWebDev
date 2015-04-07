// get the exact time when the web page loaded
var start = Date.now();

// run the updateTime() function every 500 milliseconds
var intervalID = setInterval(updateTime,500);

function updateTime() {

	// subtract current time from start time and round down (no decimal points)
	var secondsPassed = Math.floor((Date.now() - start) / 1000)
	
	// only start updating the HTML when it's been 2 seconds (because HTML says "1 second" until then)
	if (secondsPassed > 1) {
		document.getElementById('timer').innerHTML = secondsPassed + ' seconds';
	}
}