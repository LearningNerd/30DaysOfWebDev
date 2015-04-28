// some global variables to use between the timer functions
var intervalID, startTime, userSetMilliseconds, elapsedMilliseconds = 0, timerPaused = true, timerWorkMode = true;

// set event listeners for each button
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

function startTimer () {
//
	document.getElementById('timer').style.color = '';
	// if timer is paused, start it!
	if (timerPaused) {		
		// if timer is being started (not resumed), initialize w/ user input
		if (elapsedMilliseconds == 0) {
			// get user input, convert from minutes to milliseconds
			userSetMilliseconds = parseInt(document.getElementById('time').value) * 60000;
			console.log('ElapsedMilliseconds: ' + elapsedMilliseconds + '. userSetMilliseconds: ' + userSetMilliseconds);
		}
		console.log('ElapsedMilliseconds: ' + elapsedMilliseconds + '. userSetMilliseconds: ' + userSetMilliseconds);
		// get the current time
		startTime = Date.now();
		// start timer: run the updateTimer function every 500 milliseconds
		intervalID = setInterval(updateTimer,500);						
	} else { // if timer was running and is now being paused:
		clearInterval(intervalID);
		userSetMilliseconds -= elapsedMilliseconds;
		console.log('ElapsedMilliseconds: ' + elapsedMilliseconds + '. userSetMilliseconds: ' + userSetMilliseconds);
	}	
	// toggle timerPaused
	timerPaused = !timerPaused;
	updateTimerButtons();
}

function resetTimer() {
	clearInterval(intervalID);
	userSetMilliseconds = 0;
	elapsedMilliseconds = 0;
	timerPaused = true;
	updateTimerButtons();
	document.getElementById('timer').innerHTML = '00:00';
	document.getElementById('timer').style.color = '';
}

function startBreak () {
	document.getElementById('time').value = '5';
	updateTimerButtons();
}

function startWork () {
	document.getElementById('time').value = '25';
	updateTimerButtons();
}

function updateTimerButtons() {
	var timerModeString = timerWorkMode ? 'Work' : 'Break';	
	document.getElementById('start').innerHTML = timerPaused ? 'Start ' + timerModeString + ' Timer' : 'Pause ' + timerModeString + ' Timer';
	document.getElementById('reset').innerHTML = timerPaused ? 'Reset ' + timerModeString + ' Timer' : 'Reset ' + timerModeString + ' Timer';
}

function updateTimer() {
	var timerString = '';
	
	elapsedMilliseconds = (Date.now() - startTime);		
	var remainingMilliseconds = userSetMilliseconds - elapsedMilliseconds;

	// if the timer is up, stop the timer and show a message
	if (remainingMilliseconds <= 0) {
		resetTimer();
		// toggle mode from work to break or break to work
		timerWorkMode = !timerWorkMode;
		updateTimerButtons()
		var timerModeString = timerWorkMode ? 'Time to get back to work!' : 'Time to take a break!';
		document.getElementById('timer').innerHTML = timerModeString;
		document.getElementById('timer').style.color = 'red';
		document.getElementById('timer').style.fontSize = '70px';
		if (!timerWorkMode) { // if now beginning a break, then start work! otherwise, start break
			startBreak();
		} else {
			startWork();
		}		
		return;
	}
	
	// get minutes and seconds remaining, rounding down with Math.floor
	var secondsRemaining = Math.floor(remainingMilliseconds / 1000)
	var minutesRemaining = Math.floor(secondsRemaining / 60);
	var secondsRemainder = Math.floor(secondsRemaining % 60);
	
	// format timer as mm:ss. examples: 00:00, 00:09, 00:57, 02:30, 15:07
	if (minutesRemaining < 10) {
		timerString += '0'
	} 	
	timerString += minutesRemaining + ':';		
	if (secondsRemainder < 10) {
		timerString += '0';
	}	
	timerString += secondsRemainder;

	// display the timer in the HTML
	document.getElementById('timer').innerHTML = timerString;
}