import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Gameboard, ShipClass } from '@/helpers/battleLogic'

export const useGameStore = defineStore('game', {
    state: () => ({
        playerboard: ref({}),
        compboard: ref({}),
        ships: new ShipClass(),
    }),
    actions: {
        createGameboard() {
            const newPlayerboard = new Gameboard(), newCompboard = new Gameboard()
            newPlayerboard.createBoard(); newCompboard.createBoard()
            this.playerboard = newPlayerboard; this.compboard = newCompboard
        },
        playerPlaceShip(ship, x, y, direction) {
            this.playerboard.placeShip(ship, x, y, direction)
        },
        compPlaceShip(ship, x, y, direction) {
            this.compboard.placeShip(ship, x, y, direction)
        },
    }
})