export class Ship {
  constructor(length, hits) {
    this.length = length
    this.hits = hits
    this.sunk = false
  }

  hit() {
    this.hits = this.hits + 1 //increment hits
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
    this.board = Array.from({ length: size }, () => Array(size).fill(['0',]));
  }

  placeShip(ship, x, y, direction) {
    // Check if all cells are empty before placing the ship
    for (let i =  0; i < ship.length; i++) {
        const currentX = direction === 'Horizontal' ? x + i : x;
        const currentY = direction === 'Horizontal' ? y : y + i;
        if (this.board[currentY]?.[currentX][0] !== '0') {
            throw new Error('Ship cannot be placed here');
        }
    }

    // If no errors were thrown, add the ship to the ships object
    const shipsLength = Object.keys(this.ships).length;
    this.ships[shipsLength +  1] = ship;
    let lastestShipIndex = Object.keys(this.ships).length -  1; // Get the index of the last ship added

    // Place the ship on the board
    if (direction === 'Horizontal') {
        for (let i =  0; i < ship.length; i++) {
            this.board[y][x++] = [Object.keys(this.ships)[lastestShipIndex]];
        }
    } else {
        // Add ship by column if direction is vertical
        for (let i =  0; i < ship.length; i++) {
            this.board[y++][x] = [Object.keys(this.ships)[lastestShipIndex]];
        }
    }
}

  canAttack(x, y) {
    if (this.board[y][x][1] === 'X' || this.board[y][x][1] === 'M') {
      return false
    }
    return true
  }

  receiveAttack(x, y) {
    let position = [...this.board[y][x]] //get the position on the board
    let index = position[0]
    if (index === '0') { //if the position is empty
      this.missedShots++
      position[position.length] = 'M' //mark the position as missed
    } else {
      const attackedShip = this.ships?.[index] //get the ship that was attacked
      attackedShip.hit() //hit the ship
      position.push('X') //mark the position as attacked
      this.isAllSunk() //check if all ships are sunk
    }
    this.board[y][x] = position;
    return this.board[y][x][1]
  }

  isAllSunk() {
    //iterate through the ships object and check if all ships are sunk
    if (Object.keys(this.ships).length === 0) {
      this.allSunk = false
    } else {
      const isSunk = Object.values(this.ships).every(ship => ship.sunk === true);
      if (isSunk) {
        this.allSunk = true //if all ships are sunk, set allSunk to true
      }
    }
  }
}

export class Player {
  constructor(name) {
    this.name = name
  }

  attack(x, y, enemyGameboard) {
    if (enemyGameboard.board[y][x][1] === 'X' || enemyGameboard.board[y][x][1] === 'M') {
      throw new Error('Position already attacked')
    }
    enemyGameboard.receiveAttack(x, y)
  }
}