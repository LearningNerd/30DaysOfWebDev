// run drawGrid() each time the HTML element with ID startbtn is pressed
document.getElementById('startbtn').addEventListener('click', drawGrid);

function drawGrid() {
	//reset gridcontainer each time button is pressed
	document.getElementById('gridcontainer').innerHTML = '';
	
	// get user input and convert to integers
	var rows = parseInt(document.getElementById('numrows').value, 10);
	var cols = parseInt(document.getElementById('numcols').value, 10);
	
	// get the current width of gridcontainer (this changes with screen or window size)
	var gridWidth = document.getElementById('gridcontainer').offsetWidth;
	
	// Make every square of the grid the same size and make them scaled based on size of gridcontainer
	var squareSize = gridWidth / cols;
	
	// the nested loop! iterate through both columns and rows
	for (i = 0; i < cols; i++) {
		for (j = 0; j < rows; j++) {
			
			// create a new HTML element for each grid square and make it the right size
			var square = document.createElement("div");
			document.getElementById("gridcontainer").appendChild(square);			
			square.style.width = squareSize + 'px';
			square.style.height = squareSize + 'px';
			
			// set each grid square's coordinates: mutliples of the current row or column number
			var topPosition = j * squareSize;
			var leftPosition = i * squareSize;			
			
			// use CSS absolute positioning to place each grid square on the page
			square.style.top = topPosition + 'px';
			square.style.left = leftPosition + 'px';
			
			// give every other square a different class (for a different color)
			if ((i + j) % 2 == 0) {
				square.className = 'evencolor';
			}
		}
	}
}
