// this constructor function defines the Board class
function BattleshipGame(rows, cols, squareSize, gameUIContainer) {
	this.rows = rows;
	this.cols = cols;
	this.squareSize = squareSize;
	this.board = [];
	this.ships = [];
	
	// set up the game board and draw the UI
	for (i = 0; i < this.cols; i++) {
		// create empty 2d array
		this.board.push([]);
		for (j = 0; j < this.rows; j++) {
			// initialize game board 2d array with 0s
			this.board[i].push(0);
			// create a new HTML element for each grid square and make it the right size
			var square = document.createElement("div");
			gameUIContainer.appendChild(square);
			
			// set each element's id to the format 's01'
			// *** note that things will break if using more than 10 rows or cols! (accessed later using substring function assuming single digit values for row and col)
			square.id = 's' + j + i;			
			
			// use CSS absolute positioning to place each grid square on the page
			square.style.top = (j * this.squareSize) + 'px';
			square.style.left = (i * this.squareSize) + 'px';
			
			// set square size
			square.style.width = this.squareSize + 'px';
			square.style.height = this.squareSize + 'px';
			
			// set gameUIcontainer size based on square size, rows and cols
			gameUIContainer.style.width = (this.squareSize * this.cols) + 'px';
			gameUIContainer.style.height = (this.squareSize * this.rows) + 'px';
		}
	}
	
	// method for placing a ship in a random location
	// *** still need to figure out the math/logic! just one square for now:
	this.placeRandomShip = function(ship) {				
		// pick random starting coordinates (limited by # of rows/cols)
		var x = Math.floor(Math.random() * this.rows);
		var y = Math.floor(Math.random() * this.cols);
		
		// save coords in ship object
		ship.coords[i] = [x,y];
		// change color in game board UI
		document.getElementById('s'+x+y).style.background = 'red';				
	};
	
}

// constructor for the Ship class
function Ship(size) {
	this.damage = 0;
	this.coords = [];
	
	// coords array will contain [x,y] pairs for each square occupied (# of squares determined by size)
	for (i = 0; i < size; i++) {
		this.coords.push([]);
	}	
}

// run this function when user clicks "Randomly Place Ship" button
function createAndPlaceShip() {
	// only run this function if game object already exists
	if (typeof game != 'undefined') {
		var size = parseInt(document.getElementById('shipsize').value);
		console.log('in place ship of size function');
		if (size < game.rows) {
			// create a new ship, add it to game.ships
			var ship = new Ship(size);
			game.ships.push(ship);		
			game.placeRandomShip(ship);
			
			console.log(game.ships);
		} else {
			alert('Invalid ship size. Enter a number from 1 to ' + game.rows);		
		}
	} else {
		alert('Create a grid first!');
	}
}

var game; // this will be used to hold the game object

function setup() {
	//reset gridcontainer each time button is pressed
	document.getElementById('gameboard').innerHTML = '';
	
	// get user input
	var rows = parseInt(document.getElementById('numrows').value, 10);
	var cols = parseInt(document.getElementById('numcols').value, 10);
	
	// create and setup the game board
	game = new BattleshipGame(rows, cols, 50, document.getElementById("gameboard"));
}

// add event listeners to buttons
document.getElementById('startbtn').addEventListener('click', setup);
document.getElementById('placeship').addEventListener('click', createAndPlaceShip);