// run corresponding function when button is clicked
document.getElementById('oldtimey').addEventListener('click', oldtimey);

// add CSS class corresponding to the button pressed
function oldtimey() {
	document.getElementById('custom').className = 'oldtimey';
}

// run corresponding function when button is clicked
document.getElementById('modern').addEventListener('click', modern);

// add CSS class corresponding to the button pressed
function modern() {
	document.getElementById('custom').className = 'modern';
}

// run corresponding function when button is clicked
document.getElementById('handdrawn').addEventListener('click', handdrawn);

// add CSS class corresponding to the button pressed
function handdrawn() {
	document.getElementById('custom').className = 'handdrawn';
}

// run corresponding function when button is clicked
document.getElementById('digital').addEventListener('click', digital);

// add CSS class corresponding to the button pressed
function digital() {
	document.getElementById('custom').className = 'digital';
}
