function lowerCase() {
	// get the current value of the text inside the textarea with ID "cupcakeinput"
	var cupcakeInput = document.getElementById("cupcakeinput").value;
	document.getElementById("cupcakeinput").value = cupcakeInput.toLowerCase();
}

// run lowerCase function when button with ID "tolower" is pressed
document.getElementById('tolower').addEventListener('click', lowerCase);

function upperCase() {
	// get the current value of the text inside the textarea with ID "cupcakeinput"
	var cupcakeInput = document.getElementById("cupcakeinput").value;
	document.getElementById("cupcakeinput").value = cupcakeInput.toUpperCase();
}

// run upperCase function when button with ID "toupper" is pressed
document.getElementById('toupper').addEventListener('click', upperCase);

function moreCowbell() {
	// get the current value of the text inside the textarea with ID "cupcakeinput"
	var cupcakeInput = document.getElementById("cupcakeinput").value;
	var cowbellArray = cupcakeInput.split(' ');
	
	// add in the cowbell
	var cowbellCupakeText = "";
	for (var i = 0; i < cowbellArray.length; i++){
		cowbellCupakeText += cowbellArray[i] + ' cowbell ';
	}
	document.getElementById("cupcakeinput").value = cowbellCupakeText;
}

// run moreCowbell function when button with ID "morecowbell" is pressed
document.getElementById('morecowbell').addEventListener('click', moreCowbell);