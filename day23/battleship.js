// this constructor function defines the BattleshipGame class, which runs the whole game
function BattleshipGame(rows, cols, gameBoardContainer, messageContainer1, messageContainer2) {
	this.board = [];
	this.ships = [];
	this.hitCount = 0;
	this.missedCount = 0;
	this.shipsRemaining = 0;
	
	// a helper object for sending alerts to the user
	function GameAlerts (messageContainer) {
		this.displayMessage = function (newMessage) {
			messageContainer.innerHTML = newMessage;			
		};
	}
	
	this.msg1 = new GameAlerts(messageContainer1);
	this.msg2 = new GameAlerts(messageContainer2);
	
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
			gameBoardContainer.appendChild(square);
			
			// set each element's id to the format 's01'			
			square.id = 's' + i + '-' + j;
			
			// use CSS absolute positioning to place each grid square on the page
			square.style.top = (i * squareSize) + 'px';
			square.style.left = (j * squareSize) + 'px';
			
			// set square size
			square.style.width = squareSize + 'px';
			square.style.height = squareSize + 'px';
			
			// set gameBoardContainer size based on square size, rows and cols
			gameBoardContainer.style.width = (squareSize * cols) + 'px';
			gameBoardContainer.style.height = (squareSize * rows) + 'px';			
		}
	}
	
	// create and randomly place a ship (calls placeRandomShip function)
	this.createShip = function(coords) {		
		// create a new ship, add it to game.ships array
		console.log('Creating new ship with coordinates: ');
		console.log(coords);
		var ship = new Ship(coords);
		this.ships.push(ship);
		this.shipsRemaining++;		
		console.log('Number of ships on the board: ' + this.ships.length)
		console.log(this.ships);
		return ship;
	};
	
	// method for placing a ship in a random location
	this.placeRandomShip = function(size) {
		console.log('Attempting to place a ship of size ' + size);			
		var possibleShipLocations = [];
		
		function traverseBoard(game, orientation) {
			// note: assuming a square board!!! otherwise this will need to be done differently, with this.board[0].length...
			var msg = '';
			var consecutiveEmptySquares = [];
			for (i = 0; i < game.board.length; i++) {
				for (j = 0; j < game.board.length; j++) {										
					var x, y;
					if (orientation == 0) {
						x = i, y = j;
					} else {
						y = i, x = j;
					}
					// if current square is empty, add to consecutiveEmptySquares						
					if (game.board[x][y] == 0) {
						console.log(x + ',' + y + ' == 0');
						consecutiveEmptySquares.push([x,y]);
					} else {
						console.log(x + ',' + y + ' == 1 !!!!');
						consecutiveEmptySquares = []; // reset each time a ship is encountered
					}	
					// if there are enough consecutiveEmptySquares to fit the ship, then add to possibleShipLocations and reset consecutiveEmptySquares
					if 	(consecutiveEmptySquares.length == size) {
						console.log('Added to possibleShipLocations:');
						console.log(consecutiveEmptySquares);
						possibleShipLocations.push(consecutiveEmptySquares);
						consecutiveEmptySquares = [];
					}
				}				
				consecutiveEmptySquares = []; // reset for each row/column so ships don't wrap around the board
			}			
		}
		
		console.log('possibleShipLocations: ');
		console.log(possibleShipLocations);
		
		// pick random orientation, either 0 or 1 (0 = horizontal, 1 = vertical)
		var orientation = Math.floor(Math.random() * 2);
		console.log('Orientation: ' + (orientation ? 'vertical' : 'horizontal'));
		
		// check the board by row or by column for possible ship locations:
		traverseBoard(this, orientation);
				
		// if no possibleShipLocations, check again with opposite orientation
		if (possibleShipLocations.length == 0) {
			msg = 'No ' + (orientation ? 'vertical' : 'horizontal') + ' places found for this ship. Checking for ' + (!orientation ? 'vertical' : 'horizontal') + ' places.';
			console.log(msg);			
			game.msg1.displayMessage(msg);
			traverseBoard(this, !orientation);
			
			// if still no possibleShipLocations, there's no room left for a ship of this size
			if (possibleShipLocations.length == 0) {
				console.log('A ship of size ' + size + " won't fit on the board!");
				game.msg1.displayMessage('A ship of size ' + size + " won't fit on the board!");
				return;
			} else {
				msg = 'Found ' + possibleShipLocations.length + ' ' + (!orientation ? 'vertical' : 'horizontal') + ' locations for size ' + size + ' ship.';
				console.log(msg);
				game.msg1.displayMessage(msg);
			}			
		} else {
			msg = 'Found ' + possibleShipLocations.length + ' ' + (orientation ? 'vertical' : 'horizontal') + ' locations for size ' + size + ' ship.';
			console.log(msg);
			game.msg1.displayMessage(msg);
		}
		
		// pick a random entry from possibleShipLocations		
		var randomIndex = Math.floor(Math.random() * possibleShipLocations.length);
		var chosenShipCoords = possibleShipLocations[randomIndex];
		console.log('randomIndex = ' + randomIndex);
		
		// create a new ship with the chosen coordinates
		var newShip = this.createShip(chosenShipCoords);
				
		// place ship on the board and
		for (i = 0; i < chosenShipCoords.length; i++) {											
			var x = chosenShipCoords[i][0];			
			var y = chosenShipCoords[i][1];
			this.board[x][y] = 1;								
			console.log('Placed ship square ' + i + ' at ' + x + ', ' + y)			
		}		
		
		//game.msg1.displayMessage('Placed ship on the board.');
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
	
	// prevent user from clicking the board after game is over
	this.end = function() {		
		gameBoardContainer.removeEventListener("click", onBoardClick, false);
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
					this.end(); // end the game, don't allow any more clicks on the board
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
function Ship(randomlyGeneratedCoords) {
	this.damage = 0;
	this.coords = [];
	// pick a random color for each ship. code via http://stackoverflow.com/a/5092872
	this.color = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
	
	// 2d coords array will contain [x,y] coordinate pairs for each square occupied (# of squares determined by size)
	for (i = 0; i < randomlyGeneratedCoords.length; i++) {
		this.coords.push(randomlyGeneratedCoords[i]);		
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

// function to use in addEventListener -- it needed a name so I can later use removeEventHandler
// *** commented out for now, while I test the new ship placement algorithm
//var onBoardClick = function (e) {
//	return game.fireTorpedo(e);
//};

function setupGame(e) {
	// get game board container element
	var gameBoardContainer = document.getElementById('gameboard');
	// clear the game board (for when resetting)
	gameBoardContainer.innerHTML = '';
	// create and setup the game board
	game = new BattleshipGame(10, 10, gameBoardContainer, document.getElementById('message'), document.getElementById('message2'));	
	console.log('Set up new game with a ' + game.board.length + ' by ' + game.board[0].length + ' board.');
	console.log(game);	

	// create and randomly place some ships
	// call game.placeRandomShip(size) now instead of game.createShip(size)

	// for testing purposes, display all the ships on the board
	game.displayShips();
	
	// update the start button text to say restart
	// *** don't need this for testing:
	// e.target.innerHTML = 'Restart Game';
	// game.alerts.displayMessage('Click the board to fire!');
	// set event listener for all elements in gameboard, run fireTorpedo function when square is clicked
	// gameBoardContainer.addEventListener("click", onBoardClick, false);
}

// reset board visualization so animation can be run again
function resetAnimation() {	
	for (i = 0; i < game.board.length; i++) {	
		for (j = 0; j < game.board[0].length; j++) {
			// revert to default border defined in style.css
			document.getElementById('s'+i+'-'+j).style.border = '';						
		}
	}
}

function startAnimation() {
	resetAnimation();
	//var speed = parseInt(document.getElementById('speed').value);
	var size = parseInt(document.getElementById('size').value);		
	console.log('Starting placement algorithm. Ship size:' + size);	
	game.placeRandomShip(size);		
	game.displayShips();
}

// set event listeners so clicking buttons will run functions:
// *** don't need this during testing:
// document.getElementById('startbtn').addEventListener('click', setupGame);
// document.getElementById('displayships').addEventListener('click', function () {game.displayShips();});

// for testing algorithm:
setupGame();
document.getElementById('placeship').addEventListener('click', startAnimation);