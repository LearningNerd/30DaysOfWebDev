// this variable will keep track of the current number
var i = 0;

function getFizzBuzzy() {
	
	// increment i by 1 each time the function runs
	i++;

	// create an object for the list element: <li></li>
	var newItem = document.createElement("li");
		
	// put the list element inside the HTML element with ID "fizzbuzzlist"
	document.getElementById("fizzbuzzlist").appendChild(newItem);
	
	// set a fresh, empty string to append to each time the function runs
	var fizzBuzzString = '';

	// if the current number i is neither divisible by 3 nor divisible by 5
	if ( (i % 3 != 0) && (i % 5 != 0) ) {
		// append i to the string
		fizzBuzzString += i;
	}
	
	// if the current number i is divisible by 3 (has no remainder when divded by 3)
	if (i % 3 == 0) {
	
		// append Fizz to the string
		fizzBuzzString += 'Fizz';
		
		// set this list item's class="fizz " (note the empty space at the end!)
		newItem.className = "fizz ";
	}
	
	// do the same thing but with "buzz" if i is divisible by 5
	if (i % 5 == 0) {
		fizzBuzzString += 'Buzz';
		
		// set this list item's class="buzz" (or "fizz buzz" if i is also divisible by 3)
		newItem.className += "buzz";
	}
	
	// create a text node object containing the fizzbuzz text
	var text = document.createTextNode(fizzBuzzString);
	
	// put the fizzbuzz text inside the list element: <li>fizzbuzz goes in here</li>
	newItem.appendChild(text);	
}

// run getFizzBuzzy function when button with ID "btn" is pressed
document.getElementById('btn').addEventListener('click', getFizzBuzzy);