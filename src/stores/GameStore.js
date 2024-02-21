import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as battleLogic from '@/helpers/battleLogic'

export const useGameStore = defineStore('game', {
    state: () => ({
        playerboard: ref({}),
        compboard: ref({}),
        ships: new battleLogic.ShipClass(),
        cells: ref({}),
        placedShips : ref([]),
        gameStarted: ref(false),
        playerTurn: ref(false),
        compTurn: ref(false)
    }),
    actions: {
        createGameboard() {
            this.playerboard = new battleLogic.Gameboard(); this.compboard = new battleLogic.Gameboard()
            this.playerboard.createBoard(); this.compboard.createBoard()
        },
        generateCells() {
            for (let row = 0; row < 10; row++) {
                for (let col = 0; col < 10; col++) {
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
            while (this.placedShips.length > 0) {
                this.placedShips.pop(); // Clear the placedShips array
              }
        },
        compPlaceShip() {
            const ships = this.ships
            let placedShips = 0
            while (placedShips < 5) {
                // Randomly place the ships
                let x = Math.floor(Math.random() * 10)
                let y = Math.floor(Math.random() * 10)
                let ship = ships[Object.keys(ships)[placedShips]]
                let direction = Math.random() < 0.5 ? 'Horizontal' : 'Vertical' 
                try {
                    this.compboard.placeShip(ship, x, y, direction)
                    placedShips++
                } catch (error) {
                    continue
                }
            }
        },
        startGame() {
            this.gameStarted = true
            this.compPlaceShip()
            this.playerTurn = true
        },
        endGame() {
            this.gameStarted = false
        },
        playerAttack(x, y) {
            this.compboard.receiveAttack(x, y)
        }
    }
})