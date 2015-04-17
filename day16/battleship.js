// this constructor function defines the BattleshipGame class, which runs the whole game
function BattleshipGame(rows, cols, gameUIContainer, alertsContainer) {
	this.board = [];
	this.ships = [];
	this.hitCount = 0;
	this.missedCount = 0;
	this.shipsRemaining = 0;
	
	// a helper object for sending alerts to the user
	function GameAlerts (alertsContainer) {
		this.displayMessage = function (newMessage) {
			alertsContainer.innerHTML = newMessage;			
		};
	}
	
	this.alerts = new GameAlerts(alertsContainer);
	
	// set size of each grid square
	var squareSize = 50;
	
	// set up the empty game board and draw the UI
	for (i = 0; i < rows; i++) {
		// create empty 2d array
		this.board.push([]);
		for (j = 0; j < cols; j++) {
			// initialize game board 2d array with 0s
			this.board[i].push(0);
			// create a new HTML element for each grid square and make it the right size
			var square = document.createElement("div");
			gameUIContainer.appendChild(square);
			
			// set each element's id to the format 's01'			
			square.id = 's' + i + '-' + j;
			
			// use CSS absolute positioning to place each grid square on the page
			square.style.top = (i * squareSize) + 'px';
			square.style.left = (j * squareSize) + 'px';
			
			// set square size
			square.style.width = squareSize + 'px';
			square.style.height = squareSize + 'px';
			
			// set gameUIcontainer size based on square size, rows and cols
			gameUIContainer.style.width = (squareSize * cols) + 'px';
			gameUIContainer.style.height = (squareSize * rows) + 'px';			
		}
	}
	
	// create and randomly place a ship (calls placeRandomShip function)
	this.createShip = function(size) {		
		// quick lazy solution so the ship will definitely fit on the game board
		// TODO: generate ship sizes based on game board size or user inputs
		if (size > this.board.length) {
			size = this.board.length;
		}
		if (size > this.board[0].length) {
			size = this.board[0].length;			
		}
		// create a new ship, add it to game.ships array
		var ship = new Ship(size);
		this.ships.push(ship);
		this.shipsRemaining++;
		// run function that generates ship's coordinates and displays it on the game board
		this.placeRandomShip(ship, 50);
		console.log('Number of ships on the board: ' + this.ships.length)
		console.log(this.ships);
	};
	
	// method for placing a ship in a random location
	this.placeRandomShip = function(ship, maxAttempts) {
		console.log('Attempting to place a ship of size ' + ship.coords.length);
		// pick random starting coordinates (limited by # of rows/cols)
		var x = Math.floor(Math.random() * this.board.length);
		var y = Math.floor(Math.random() * this.board[0].length);
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
			console.log('Placed ship square ' + i + ' at ' + x + ', ' + y)
		}
		console.log('Ship of size ' + ship.coords.length + ' successfully placed on the board!')
	};
	
	this.displayShips = function() {
		for (i = 0; i < this.ships.length; i++) {	
			for (j = 0; j < this.ships[i].coords.length; j++) {		
				var x = this.ships[i].coords[j][0];
				var y = this.ships[i].coords[j][1];

				if (this.board[x][y] == 2) {
					document.getElementById('s'+x+'-'+y).style.background = 'red';
				} else if (this.board[x][y] == 3) {
					document.getElementById('s'+x+'-'+y).style.background = '#bbb';
				} else {
					document.getElementById('s'+x+'-'+y).style.background = this.ships[i].color;
				}
			}
		}
	};	
	
	// return the ship object that occupies the given coordinate on the game board
	this.getShipByCoordinate = function(x, y) {
		for (i = 0; i < this.ships.length; i++) {
			for (j = 0; j < this.ships[i].coords.length; j++) {	
				if (this.ships[i].coords[j][0] == x && this.ships[i].coords[j][1] == y) {
					// if the coordinate belongs to the current ship, return this ship
					return this.ships[i];
				}	// otherwise, keep searching until finding a match
			}
		}
		// if all ships have been checked and no match, return false to indicate no ship has these coordinates
		return false;
	};
	
	// run this method when user clicks on the game board
	// boilerplate code via http://www.kirupa.com/html5/handling_events_for_many_elements.htm
	this.fireTorpedo = function (e) {	
		var newMessage = '';
		// if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
		if (e.target !== e.currentTarget) {
			// extract row and column # from the HTML element's id
				// TODO: rewrite this for dynamic board size with more than 10 columns
			var row = e.target.id.substring(1,2);
			var col = e.target.id.substring(3,4);			
			console.log('Firing torpedo!');
					
			// if player clicks a square with no ship, change the color and change square's value
			if (this.board[row][col] == 0) {
				e.target.style.background = '#bbb';
				// set this square's value to 3 to indicate that they fired and missed
				this.board[row][col] = 3;
				this.missedCount++;
				console.log('Missed!');
				newMessage = '<br/>Missed!';
				
			// if player clicks a square with a ship, change the color and change square's value
			} else if (this.board[row][col] == 1) {
				e.target.style.background = 'red';
				// set this square's value to 2 to indicate the ship has been hit
				this.board[row][col] = 2;			
				// increment hitCount each time a ship is hit
				this.hitCount++;			
				
				var currentShip = this.getShipByCoordinate(row, col);
				var isShipSunk = currentShip.takeDamage(row, col);
				if (isShipSunk) {
					newMessage = '<br/><strong>Battleship sunk!</strong>';
					this.shipsRemaining--;					
				} else {
					newMessage = '<br/>You hit a ship!';					
				}
				console.log('Hit! Ships remaining: ' + this.shipsRemaining);
				console.log('isShipSunk: ' + isShipSunk);
				console.log('currentShip.damage: ' + currentShip.damage);				
				if (this.shipsRemaining == 0) {
					newMessage = "<br/><strong>All enemy battleships have been defeated! You win!</strong>";
				}
			// if player clicks a square that's been previously hit, let them know
			} else if (this.board[row][col] > 1) {
				newMessage = '<br/>Stop wasting your torpedos! You already fired at this location.';				
			}	
			// update game score in HTML
			this.alerts.displayMessage('Hits: <strong>' + this.hitCount + '</strong> | Misses: <strong>' + this.missedCount + '</strong> | Ships remaining: <strong>' + this.shipsRemaining + newMessage + '</strong>');
		}
		e.stopPropagation();
	};
}

// constructor for the Ship class
function Ship(size) {
	this.damage = 0;
	this.coords = [];
	// pick a random color for each ship. code via http://stackoverflow.com/a/5092872
	this.color = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
	
	// 2d coords array will contain [x,y] coordinate pairs for each square occupied (# of squares determined by size)
	for (i = 0; i < size; i++) {
		this.coords.push([]);
	}

	// update ship's damage count and return true if ship has been sunk
	this.takeDamage = function (x, y) {
		for (i = 0; i < this.coords.length; i++) {		
			if (this.coords[i][0] == x && this.coords[i][1] == y) {
				this.damage++;
				console.log('Ship took damage at ' + x + ', ' + y + '. Damage: ' + this.damage);
			}
		}
		if (this.damage == this.coords.length) {
			return true; // ship has been sunk!
		} else {
			return false;
		}
	};	
}

// global game variable, which will be modified by other functions
var game;

function setupGame(e) {
	// get game board container element
	var gameBoardContainer = document.getElementById('gameboard');
	// clear the game board (for when resetting)
	gameBoardContainer.innerHTML = '';
	// create and setup the game board
	game = new BattleshipGame(10, 10, gameBoardContainer, document.getElementById('message'));	
	console.log('Set up new game with a ' + game.board.length + ' by ' + game.board[0].length + ' board.');
	console.log(game);	

	// create and randomly place some ships
	game.createShip(2);
	game.createShip(3);
	game.createShip(3);
	game.createShip(4);
	game.createShip(5);

	// update the start button text to say restart
	e.target.innerHTML = 'Restart Game';
	game.alerts.displayMessage('Click the board to fire!');
	// set event listener for all elements in gameboard, run fireTorpedo function when square is clicked
	gameBoardContainer.addEventListener("click", function (e) {return game.fireTorpedo(e);}, false);
}

// set event listeners so clicking buttons will run functions:
document.getElementById('startbtn').addEventListener('click', setupGame);
document.getElementById('displayships').addEventListener('click', function () {game.displayShips();});