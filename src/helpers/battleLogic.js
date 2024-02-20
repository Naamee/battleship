export class Ship {
  constructor(length, hits) {
    this.length = length
    this.hits = hits
    this.sunk = false
  }

  hit() {
    this.hits++ //increment hits
    if (this.hits === this.length) {
      return this.isSunk()
    }
  }

  isSunk() {
    return this.sunk = true
  }
}

export class ShipClass {
  constructor() {
    this.carrier = new Ship(7, 0)
    this.destroyer = new Ship(5, 0)
    this.submarine = new Ship(3, 0)
    this.cruiser = new Ship(6, 0)
    this.frigate = new Ship(4, 0)
  }
}

export class Gameboard {
  constructor() {
    this.board = []
    this.ships = {}
    this.missedShots = 0
    this.allSunk = false
  }

  createBoard() {
    // Create a 2D array of size 10x10 and fill it with 0's
    const size = 10;
    this.board = Array.from({ length: size }, () => Array(size).fill('0'));
  }

  placeShip(ship, x, y, direction) {
    // Add ship to ships object
    const shipsLength = Object.keys(this.ships).length;
    this.ships[shipsLength +  1] = ship;
    let lastestShipIndex = Object.keys(this.ships).length -  1; // Get the index of the last ship added
  
    // Check if all cells are empty before placing the ship
    for (let i =  0; i < ship.length; i++) {
      const currentX = direction === 'Horizontal' ? x + i : x;
      const currentY = direction === 'Horizontal' ? y : y + i;
  
      if (this.board[currentY]?.[currentX] !== '0') {
        throw new Error('Ship cannot be placed here');
      }
    }
  
    // Place the ship on the board
    if (direction === 'Horizontal') {
      for (let i =  0; i < ship.length; i++) {
        this.board[y][x++] = Object.keys(this.ships)[lastestShipIndex];
      }
    } else {
      // Add ship by column if direction is vertical
      for (let i =  0; i < ship.length; i++) {
        this.board[y++][x] = Object.keys(this.ships)[lastestShipIndex];
      }
    }
  }

  receiveAttack(x, y) {
    let position = this.board[y]?.[x] //get the position on the board
    if (position === '0') { //if the position is empty
      this.missedShots++
      this.board[y][x] = 'M' //mark the position as missed
    } else {
      const attackedShip = this.ships?.[position] //get the ship that was attacked
      attackedShip.hit() //hit the ship
      this.board[y][x] = 'X' //mark the position as attacked
      this.isAllSunk() //check if all ships are sunk
    }
  }

  isAllSunk() {
    //iterate through the ships object and check if all ships are sunk
    const isSunk = Object.values(this.ships).every(ship => ship.sunk === true);
    if (isSunk) {
      this.allSunk = true //if all ships are sunk, set allSunk to true
    }
  }
}

export class Player {
  constructor(name) {
    this.name = name
  }

  attack(x, y, enemyGameboard) {
    if (enemyGameboard.board[y][x] === 'X' || enemyGameboard.board[y][x] === 'M') {
      throw new Error('Position already attacked')
    }
    enemyGameboard.receiveAttack(x, y)
  }

  randomAttack(enemyGameboard) {
    let x = Math.floor(Math.random() * 10)
    let y = Math.floor(Math.random() * 10)

    if (enemyGameboard.board[y][x] === 'X' || enemyGameboard.board[y][x] === 'M') {
      this.randomAttack()
    }

    this.attack(x, y, enemyGameboard)
  }
}

// function playerSetup() {
//   //initialize player, gameboard and ships
//   const player = new Player('Player')
//   const playerGameboard = new Gameboard()
//   const Ships = new ShipClass()

//   //create gameboard
//   playerGameboard.createBoard()

//   //player place ships on gameboard
//   playerGameboard.placeShip(Ships.carrier, 0, 0, 'Horizontal')
//   playerGameboard.placeShip(Ships.destroyer, 0, 1, 'Horizontal')
//   playerGameboard.placeShip(Ships.submarine, 0, 2, 'Horizontal')
//   playerGameboard.placeShip(Ships.cruiser, 0, 3, 'Horizontal')
//   playerGameboard.placeShip(Ships.frigate, 0, 4, 'Horizontal')

//   return { player, playerGameboard }
// }

// function computerSetup() {
//   //initialize computer, gameboard and ships
//   const computer = new Player('Computer')
//   const computerGameboard = new Gameboard()
//   const Ships = new ShipClass()

//   //create gameboards
//   computerGameboard.createBoard()

//   //computer places ships on gameboard
//   computerGameboard.placeShip(Ships.carrier, 0, 0, 'Horizontal')
//   computerGameboard.placeShip(Ships.destroyer, 0, 1, 'Horizontal')
//   computerGameboard.placeShip(Ships.submarine, 0, 2, 'Horizontal')
//   computerGameboard.placeShip(Ships.cruiser, 0, 3, 'Horizontal')
//   computerGameboard.placeShip(Ships.frigate, 0, 4, 'Horizontal')

//   return { computer, computerGameboard }
// }


// function Game() {
//   playerSetup()
//   computerSetup()
//   //game loop
//   while (playerSetup().playerGameboard.allSunk === false || computerSetup().computerGameboard.allSunk === false) {
//     playerSetup().player.randomAttack(computerSetup().computerGameboard)
//     computerSetup().computer.randomAttack(playerSetup().playerGameboard)
//   }
//   //check who won 
//   if (playerSetup.playerGameboard.allSunk === true) {
//     console.log('Computer wins')
//   } else {
//     console.log('Player wins')
//   }
// }

// Game()