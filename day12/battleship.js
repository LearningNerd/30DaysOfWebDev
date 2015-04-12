function drawGrid(gameBoardContainer) {
	// set grid rows and columns and the size of each square
	var rows = 10;
	var cols = 10;
	var squareSize = 50;
	// make the grid columns and rows
	for (i = 0; i < cols; i++) {
		for (j = 0; j < rows; j++) {
			
			// create a new HTML element for each grid square and make it the right size
			var square = document.createElement("div");
			gameBoardContainer.appendChild(square);
			
			square.id = 's' + j + i;			
			
			// set each grid square's coordinates: multiples of the current row or column number
			var topPosition = j * squareSize;
			var leftPosition = i * squareSize;			
			
			// use CSS absolute positioning to place each grid square on the page
			square.style.top = topPosition + 'px';
			square.style.left = leftPosition + 'px';						
		}
	}
}

// create the array that will contain the status of each square on the board
// and place ships on the board (later, create function for random placement!)
// 0 = empty, 1 = part of a ship, 2 = a sunken part of a ship, 3 = a missed shot
var gameBoard = [
				[0,0,0,1,1,1,1,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,1,0,0,0],
				[0,0,0,0,0,0,1,0,0,0],
				[1,0,0,0,0,0,1,1,1,1],
				[1,0,0,0,0,0,0,0,0,0],
				[1,0,0,1,0,0,0,0,0,0],
				[1,0,0,1,0,0,0,0,0,0],
				[1,0,0,0,0,0,0,0,0,0]
				]
// lazy way of tracking when the game is won: just increment hitCount on every hit
var hitCount = 0;

// actually draw the grid
var gameBoardContainer = document.getElementById("gameboard");
drawGrid(gameBoardContainer);

// set event listener for all elements in gameboard, run firTorpedo function when square is clicked
gameBoardContainer.addEventListener("click", fireTorpedo, false);

// initial code via http://www.kirupa.com/html5/handling_events_for_many_elements.htm:
function fireTorpedo(e) {
    // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
	if (e.target !== e.currentTarget) {
        // extract row and column # from the HTML element's id
		var row = e.target.id.substring(1,2);
		var col = e.target.id.substring(2,3);
        //alert("Clicked on row " + row + ", col " + col);
				
		// if player clicks a square with no ship, change the color and change square's value
		if (gameBoard[row][col] == 0) {
			e.target.style.background = '#bbb';
			// set this square's value to 3 to indicate that they fired and missed
			gameBoard[row][col] = 3;
			
		// if player clicks a square with a ship, change the color and change square's value
		} else if (gameBoard[row][col] == 1) {
			e.target.style.background = 'red';
			// set this square's value to 2 to indicate the ship has been hit
			gameBoard[row][col] = 2;
			
			// increment hitCount each time a ship is hit
			hitCount++;
			// this definitely shouldn't be hard-coded, but here it is anyway. lazy, simple solution:
			if (hitCount == 17) {
				alert("All enemy battleships have been defeated! You win!");
			}
			
		// if player clicks a square that's been previously hit, let them know
		} else if (gameBoard[row][col] > 1) {
			alert("Stop wasting your torpedos! You already fired at this location.");
		}		
    }
    e.stopPropagation();
}