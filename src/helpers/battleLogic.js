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
    //add ship to ships object 
    const shipsLength = Object.keys(this.ships).length
    this.ships[shipsLength + 1] = ship
    let lastestShipIndex = Object.keys(this.ships).length - 1  //get the index of the last ship added

    if (direction === 'Horizontal') {
      for (let i = 0; i < ship.length; i++) {
        //add ship key to corresponding position on board
        if (this.board[y]?.[x] !== '0') {
          throw new Error('Ship already placed here')
        }
        this.board[y][x++] = Object.keys(this.ships)[lastestShipIndex]
      }
    } else {
      // add ship by column if direction is vertical
      for (let i = 0; i < ship.length; i++) {
        if (this.board[y]?.[x] !== '0') {
          throw new Error('Ship already placed here')
        }
        this.board[y++][x] = Object.keys(this.ships)[lastestShipIndex]
      }
    }
  }

  receiveAttack(x, y) {
    let position = this.board[y]?.[x] //get the position on the board
    if (position === '0') { //if the position is empty
      return this.missedShots++ 
    }
    const attackedShip = this.ships?.[position] //get the ship that was attacked
    attackedShip?.hit() //hit the ship
    this.board[y][x] = 'X' //mark the position as attacked
    this.isAllSunk() //check if all ships are sunk
  }

  isAllSunk() {
    //iterate through the ships object and check if all ships are sunk
    const isSunk = Object.values(this.ships).every(ship => ship.sunk === true);
    if (isSunk) {
      this.allSunk = true //if all ships are sunk, set allSunk to true
    }
  }  
}

