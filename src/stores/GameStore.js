import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as battleLogic from '@/helpers/battleLogic'

export const useGameStore = defineStore('game', {
    state: () => ({
        playerboard: ref({}),
        compboard: ref({}),
        ships: new battleLogic.ShipClass(),
        cells: ref({}),
        placedShips: ref([]),
        gameStarted: ref(false),
        gameStatus: ref({'gameEnded': false, 'winner': ''}),
        playerTurn: ref(false),
        compTurn: ref(false)
    }),
    actions: {
        createGameboard() {
            this.playerboard = new battleLogic.Gameboard(); this.compboard = new battleLogic.Gameboard()
            this.playerboard.createBoard(); this.compboard.createBoard()
        },
        generateCells() {
            for (let row =  0; row <  10; row++) {
                for (let col =  0; col <  10; col++) {
                    // Create the key in the format 'row-col'
                    const key = `${row}-${col}`;
                    // Set the value to false for each cell
                    this.cells[key] = false;
                }
            }
        },
        playerPlaceShip(shipName, ship, x, y, direction) {
            try {
                this.playerboard.placeShip(ship, x, y, direction)
                this.placedShips.push(shipName)
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        },
        clearPlacedShips() {
            this.playerboard.createBoard() // Clear the board
            while (this.placedShips.length >  0) {
                this.placedShips.pop(); // Clear the placedShips array
            }
        },
        compPlaceShip() {
            const ships = new battleLogic.ShipClass()
            for (const ship in ships) {
                if (Object.hasOwnProperty.call(ships, ship)) {
                    let x, y, direction, success = false;
        
                    do {
                        x = Math.floor(Math.random() *  10);
                        y = Math.floor(Math.random() *  10);
                        direction = Math.random() <  0.5 ? 'Horizontal' : 'Vertical';
        
                        try {
                            this.compboard.placeShip(ships[ship], x, y, direction);
                            success = true; // Set success to true if the operation is successful
                        } catch (error) {
                            continue
                        }
                    } while (!success); // Keep trying until the ship is successfully placed
                }
            }
        },
        startGame() {
            this.gameStarted = true
            this.compPlaceShip()
            this.playerTurn = true
        },
        endGame() {
            this.playerboard.isAllSunk()
            this.compboard.isAllSunk()
            if (this.playerboard.allSunk) {
                this.gameStatus.gameEnded = true
                this.gameStatus.winner = 'comp'
            } else if (this.compboard.allSunk) {
                this.gameStatus.gameEnded = true
                this.gameStatus.winner = 'player'
            }
        },
        resetGame() {
            this.playerboard.createBoard()
            this.compboard.createBoard()
            this.placedShips = []
            this.gameStarted = false
            this.gameStatus.gameEnded = false
            this.gameStatus.winner = ''
            this.playerTurn = false
            this.compTurn = false
        },
        playerAttack(x, y) {
            if (this.compboard.canAttack(x, y)) {
                const result = this.compboard.receiveAttack(x, y);
                this.endGame()
                if (result === 'M') {
                    this.switchTurn();
                }
            } else {
                console.log('You already attacked this cell');
            }
        },
        switchTurn() {
            if (this.playerTurn) {
                this.playerTurn = false
                this.compTurn = true
                setTimeout(() => {
                    this.compAttack()
                },  1000);
            } else {
                this.compTurn = false
                this.playerTurn = true
            }
        },
        compAttack() {
            let x = Math.floor(Math.random() *  10);
            let y = Math.floor(Math.random() *  10);
            if (this.playerboard.canAttack(x, y)) {
                const attackResult = this.playerboard.receiveAttack(x, y);
                this.endGame()
                if (attackResult === 'X') {
                    setTimeout(() => {
                        this.compAttack();
                        this.endGame()
                    },  1000);
                }

                if (attackResult === 'M') {
                    this.switchTurn();
                }
            } else if (!this.playerboard.canAttack(x, y)) {
                this.compAttack();
            }
        }
    } // This is the missing closing bracket for the actions object
}) // This is the closing bracket for the defineStore call