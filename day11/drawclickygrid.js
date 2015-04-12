function drawGrid(gameBoard) {
	// set grid rows and columns and the size of each square
	var rows = 10;
	var cols = 10;
	var squareSize = 50;
	// make the grid columns and rows
	for (i = 0; i < cols; i++) {
		for (j = 0; j < rows; j++) {
			
			// create a new HTML element for each grid square and make it the right size
			var square = document.createElement("div");
			gameBoard.appendChild(square);
			
			square.id = 'square-' + j + i;			
			
			// set each grid square's coordinates: multiples of the current row or column number
			var topPosition = j * squareSize;
			var leftPosition = i * squareSize;			
			
			// use CSS absolute positioning to place each grid square on the page
			square.style.top = topPosition + 'px';
			square.style.left = leftPosition + 'px';						
		}
	}
}

// actually draw the grid
var gameBoard = document.getElementById("gameboard");
drawGrid(gameBoard);

// set event listener for all elements in gameboard
gameBoard.addEventListener("click", makeAlert, false);

// create an alert box saying which element was clicked
// code via http://www.kirupa.com/html5/handling_events_for_many_elements.htm
function makeAlert(e) {
    if (e.target !== e.currentTarget) {
        //var clickedItem = e.target.id;
        //alert("Clicked on " + clickedItem);
		e.target.style.background = 'red';
    }
    e.stopPropagation();
}
