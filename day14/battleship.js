// this constructor function defines the BattleshipGame class, which runs the whole game
function BattleshipGame(rows, cols, squareSize, gameUIContainer) {
	this.rows = rows;
	this.cols = cols;
	this.squareSize = squareSize;
	this.board = [];
	this.ships = [];
	
	// set up the empty game board and draw the UI
	for (i = 0; i < this.rows; i++) {
		// create empty 2d array
		this.board.push([]);
		for (j = 0; j < this.cols; j++) {
			// initialize game board 2d array with 0s
			this.board[i].push(0);
			// create a new HTML element for each grid square and make it the right size
			var square = document.createElement("div");
			gameUIContainer.appendChild(square);
			
			// set each element's id to the format 's01'			
			square.id = 's' + i + '-' + j;
			
			// use CSS absolute positioning to place each grid square on the page
			square.style.top = (i * this.squareSize) + 'px';
			square.style.left = (j * this.squareSize) + 'px';
			
			// set square size
			square.style.width = this.squareSize + 'px';
			square.style.height = this.squareSize + 'px';
			
			// set gameUIcontainer size based on square size, rows and cols
			gameUIContainer.style.width = (this.squareSize * this.cols) + 'px';
			gameUIContainer.style.height = (this.squareSize * this.rows) + 'px';			
		}
	}
	
	// method for placing a ship in a random location
	this.placeRandomShip = function(ship, maxAttempts) {
		console.log('Attempting to place a ship of size ' + ship.coords.length);
		// pick random starting coordinates (limited by # of rows/cols)
		var x = Math.floor(Math.random() * this.rows);
		var y = Math.floor(Math.random() * this.cols);
		// pick random orientation, either 0 or 1 (0 = horizontal, 1 = vertical)
		var orientation = Math.floor(Math.random() * 2);
		console.log('Starting coords: ' + x + ', ' + y + '\nOrientation: ' + (orientation ? 'vertical' : 'horizontal'));
		
		// create a temporary ship in which to test generated coords; only place ship if there's room for it!
		var testShip = ship;
		for (i = 0; i < testShip.coords.length; i++) {
			// if current x, y coords exist on the board and the square is empty (contains a 0):
			if (typeof this.board[x] != 'undefined' && typeof this.board[x][y] != 'undefined' && this.board[x][y] == 0) {
				// save current coords to temporary ship
				testShip.coords[i] = [x, y];
				console.log('Trying testShip.coords[' + i + '] = ' + ship.coords[i]);
				if (orientation == 0) {
					y++; //increment y coord to generate a ship oriented horizontally
				} else {
					x++; // increment x coord for vertical ships
				}
			} else if (maxAttempts > 0) { // if this spot goes off the grid or a ship already exists there, try again until maxAttemps is reached:					
				console.log("Ship can't be placed. maxAttempts = " + maxAttempts);
				// delete this ship!
				// decrement maxAttempts and call this function to try placing the ship again
				maxAttempts--;
				this.placeRandomShip(ship, maxAttempts);	
				return;				
				// everything after here in the placeRandomShip() function should only execute if there's room for the ship:
				
			} else {	// if ship can't be placed and maxAttempts has been reached, tell the user to try again:
				console.log("Ship can't be placed. maxAttempts = " + maxAttempts);
				alert("Ship could not be placed. If there isn't room, try placing a smaller ship.");
				return;
			}
		}	
		console.log('Determined that this ship will fit on the board.');
		// save ship's coordinates to ship object and board object
		ship = testShip;
		// place ship on board object, represented by a 1 for each of the ship's coordinate locations
		for (i = 0; i < ship.coords.length; i++) {		
			var x = ship.coords[i][0];
			var y = ship.coords[i][1];
			this.board[x][y] = 1;
			// change color in game board UI for each location
			document.getElementById('s'+x+'-'+y).style.background = 'red';
			console.log('Placed ship square ' + i + ' at ' + x + ', ' + y)
		}
		console.log('Ship of size ' + ship.coords.length + ' successfully placed on the board!')
	};
	
}

// constructor for the Ship class
function Ship(size) {
	this.damage = 0;
	this.coords = [];
	
	// 2d coords array will contain [x,y] coordinate pairs for each square occupied (# of squares determined by size)
	for (i = 0; i < size; i++) {
		this.coords.push([]);
	}	
}

// run this function when user clicks "Randomly Place Ship" button
function createAndPlaceShip() {
	// only run this function if game object already exists
	if (typeof game != 'undefined') {
		// ships have no size yet, they're all just 1 square! but I left this here for later
		var size = parseInt(document.getElementById('shipsize').value);

		if (size < game.rows) {
			// create a new ship, add it to game.ships array
			var ship = new Ship(size);
			game.ships.push(ship);
			// run function that generates ship's coordinates and displays it on the game board
			game.placeRandomShip(ship, 10);
			console.log('Number of ships on the board: ' + game.ships.length)
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
	console.log('Set up new game with a ' + rows + ' by ' + cols + ' board.');
	console.log(game);
}

// add event listeners to buttons
document.getElementById('startbtn').addEventListener('click', setup);
document.getElementById('placeship').addEventListener('click', createAndPlaceShip);
