import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as battleLogic from '@/helpers/battleLogic'

export const useGameStore = defineStore('game', {
    state: () => ({
        playerboard: ref({}),
        compboard: ref({}),
        ships: new battleLogic.ShipClass(),
        cells: {},
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
                    this.cells[key] = true;
                }
            }
        },
        playerPlaceShip(ship, x, y, direction) {
            this.playerboard.placeShip(ship, x, y, direction)
        },
        compPlaceShip(ship, x, y, direction) {
            this.compboard.placeShip(ship, x, y, direction)
        },
        playerAttack(x, y) {
            this.compboard.receiveAttack(x, y)
        },
    }
})