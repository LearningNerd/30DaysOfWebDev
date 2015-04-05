// Run my convertFromDecimal() function when something is typed in the input box with id "decimal"
document.getElementById('decimal').addEventListener('keyup', convertFromDecimal);

function convertFromDecimal() {
	// get the user's input and convert from a string to an integer in base 10 (decimal)
	var decimalInput = parseInt(document.getElementById("decimal").value, 10);
	
	// use parseInt again to convert from decimal integer to binary string representation
	document.getElementById("binary").value = decimalInput.toString(2);

	// use toString to convert from binary integer to its hexadecimal string representation
	document.getElementById("hexadecimal").value = decimalInput.toString(16).toUpperCase();
}

// Run convertFromBinary() function when something is typed in the input box with id "binary"
document.getElementById('binary').addEventListener('keyup', convertFromBinary);

function convertFromBinary() {
	// get the user's input and convert from a string to an integer in base 2 (binary)
	var binaryInput = parseInt(document.getElementById("binary").value, 2);
	
	// use toString to convert from binary integer to decimal string representation
	document.getElementById("decimal").value = binaryInput.toString(10);
	
	// use toString to convert from binary integer to its hexadecimal string representation
	document.getElementById("hexadecimal").value = binaryInput.toString(16).toUpperCase();
}

// Run my convertNumber() function when something is typed in the input box with id "hexadecimal"
document.getElementById('hexadecimal').addEventListener('keyup', convertFromHexadecimal);

function convertFromHexadecimal() {
	// get the user's input and convert from a string to an integer in base 16 (hexadecimal)
	var hexInput = parseInt(document.getElementById("hexadecimal").value, 16);
	
	// use toString to convert from hexadecimal integer to decimal string representation
	document.getElementById("decimal").value = hexInput.toString(10);
	
	// use toString to convert from hexadecimal integer to its binary string representation
	document.getElementById("binary").value = hexInput.toString(2);
}