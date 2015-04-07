// get the exact time when the web page loaded
var start = Date.now();

// run the updateTime() function every 500 milliseconds
var intervalID = setInterval(updateTime,500);

function updateTime() {

	var timerString = '';

	// subtract current time from start time and round down (no decimal points)
	var secondsPassed = Math.floor((Date.now() - start) / 1000)
	var minutesPassed = Math.floor(secondsPassed / 60);
	var secondsRemainder = Math.floor(secondsPassed % 60);
	
	// say "1 minute" singular, but then use "minutes" plural
	if (minutesPassed == 1) {
		timerString += minutesPassed + ' minute';
	} else if (minutesPassed > 1){
		timerString += minutesPassed + ' minutes';
	}
	
	if (minutesPassed >= 1 && secondsRemainder >= 1) {
		timerString += ' and ';
	}
	
	// so the timer doesn't disappear before the first second elapses:
	if (secondsPassed == 0) {
		timerString += secondsPassed + ' seconds';
	}
	
	// say "1 second" singular, but then use plural "Seconds"
	if (secondsRemainder == 1) {
		timerString += secondsRemainder + ' second';
	} else if (secondsRemainder > 1){	
		timerString += secondsRemainder + ' seconds';
	}
	
	// put the timer info into the HTML
	document.getElementById('timer').innerHTML = timerString;
}