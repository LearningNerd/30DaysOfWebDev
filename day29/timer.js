// some global variables to use between the timer functions
var intervalID, startTime, userSetMilliseconds, userSetWorkDuration = '25', userSetBreakDuration = '5', 
	elapsedMilliseconds = 0, timerPaused = true, timerWorkMode = true, timerOn = false,
	finishedPomodoros = 0;

// set event listeners for each button
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('resethistory').addEventListener('click', resetHistory);
window.addEventListener('beforeunload', saveState); // save timer state when page is closed

// if there's stuff in local storage, resume previous state
if(localStorage.getItem('intervalID')) {
	resumeState();
}

console.log('ID: ' + intervalID);
console.log('timerOn: ' + timerOn);
console.log('timerWorkMode: ' + timerWorkMode);
console.log('timerPaused: ' + timerPaused);
console.log('Finished pomodoros: ' + finishedPomodoros);
console.log('userSetMilliseconds: ' + userSetMilliseconds);
console.log('elapsedMilliseconds: ' + elapsedMilliseconds);

function startTimer () {
	console.log('in startTimer, timerOn: ' + timerOn);
	// reset to default font color (because font turns red when timer is up)
	document.getElementById('timer').style.color = '';
	
	// to save user's preference for work and break session duration
	if (timerWorkMode) {
		userSetWorkDuration = document.getElementById('time').value;
	} else {
		userSetBreakDuration = document.getElementById('time').value;
	}
	// if timer is paused, start it!
	if (timerPaused) {
		timerOn = true;
		timerPaused = false;
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
		// toggle timerOn (to save status when reopening the web page)
		timerOn = false;
		timerPaused = true;
		clearInterval(intervalID);
		userSetMilliseconds -= elapsedMilliseconds;
		console.log('ElapsedMilliseconds: ' + elapsedMilliseconds + '. userSetMilliseconds: ' + userSetMilliseconds);
	}		
	updateTimerButtons();
}

function resetTimer() {
	clearInterval(intervalID);
	userSetMilliseconds = 0;
	elapsedMilliseconds = 0;
	timerPaused = true;
	timerOn = false;
	updateTimerButtons();
	document.getElementById('timer').innerHTML = '00:00';
	document.getElementById('timer').style.color = '';
}

function startBreak () {
	document.getElementById('time').value = userSetBreakDuration;
	updateTimerButtons();
}

function startWork () {
	document.getElementById('time').value = userSetWorkDuration;
	updateTimerButtons();
}

function updateTimerButtons() {
	var timerModeString = timerWorkMode ? 'Work' : 'Break';	
	document.getElementById('start').innerHTML = timerPaused ? 'Start ' + timerModeString + ' Timer' : 'Pause ' + timerModeString + ' Timer';
	document.getElementById('reset').innerHTML = timerPaused ? 'Reset ' + timerModeString + ' Timer' : 'Reset ' + timerModeString + ' Timer';
}

function displayTimer(remainingMilliseconds) {
	var timerString = '';
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

function playTimerDoneSound() {
	var ding = new Audio('ding.wav');
	ding.play();
}

function updateTimer() {	
	elapsedMilliseconds = (Date.now() - startTime);		
	var remainingMilliseconds = userSetMilliseconds - elapsedMilliseconds;

	// if the timer is up, stop the timer and show a message
	if (remainingMilliseconds <= 0) {
		playTimerDoneSound();
		if (timerWorkMode) {
			finishedPomodoros++; // save # of pomodoros completed
			document.getElementById('pomodoros').innerHTML = finishedPomodoros;
			console.log('Completed a pomodoro! #: ' + finishedPomodoros);
		}
		resetTimer();
		// toggle mode from work to break or break to work
		timerWorkMode = !timerWorkMode;
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
	
	displayTimer(remainingMilliseconds);
}

// code via http://diveintohtml5.info/storage.html
function supportsLocalStorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function saveState() {
    if (!supportsLocalStorage()) { return false; }
	console.log('CALLLING SAVESTATE!');
	if (!timerPaused) { // so timer will continue where it left off when window is reopened
		userSetMilliseconds -= elapsedMilliseconds;
	}
    localStorage['intervalID'] = intervalID;
	localStorage['timerOn'] = timerOn;
	localStorage['timerPaused'] = timerPaused;
	localStorage['timerWorkMode'] = timerWorkMode;
	localStorage['userSetWorkDuration'] = userSetWorkDuration;
	localStorage['userSetBreakDuration'] = userSetBreakDuration;
	localStorage['userSetMilliseconds'] = userSetMilliseconds;
	localStorage['elapsedMilliseconds'] = elapsedMilliseconds;
	localStorage['finishedPomodoros'] = finishedPomodoros;
	return true;
}

function resumeState() {
	console.log('CALLING RESUMESTATE!');	
	intervalID = parseInt(localStorage['intervalID']);
	timerOn = (localStorage['timerOn'] == 'true');
	timerPaused = (localStorage['timerPaused'] == 'true');
	timerWorkMode = (localStorage['timerWorkMode'] == 'true'); // convert from string 'true'/'false' to actual boolean TRUE/FALSE	
	userSetWorkDuration = localStorage['userSetWorkDuration'];
	userSetBreakDuration = localStorage['userSetBreakDuration'];
	userSetMilliseconds = parseInt(localStorage['userSetMilliseconds']);
	elapsedMilliseconds = parseInt(localStorage['elapsedMilliseconds']);
	finishedPomodoros = parseInt(localStorage['finishedPomodoros']);
	
	// show user's preference for work and break session duration
	if (timerWorkMode) {
		document.getElementById('time').value = userSetWorkDuration;
	} else {
		document.getElementById('time').value = userSetBreakDuration;
	}
	
	
	updateTimerButtons();	
	
	displayTimer(userSetMilliseconds);
	
	console.log('timerOn right after resumeState: ' + timerOn);
	if (timerOn) {
		console.log('CALLING STARTTIMER');
		timerPaused = true; // then toggle it back on in startTimer() -- temporary workaround for messy code!
		startTimer();
	}
	
	document.getElementById('pomodoros').innerHTML = finishedPomodoros;
}

function resetHistory() {	
	localStorage.clear();	
	finishedPomodoros = 0;
	
	document.getElementById('pomodoros').innerHTML = finishedPomodoros;
}