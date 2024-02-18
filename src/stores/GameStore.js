import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as battleLogic from '@/helpers/battleLogic'

export const useGameStore = defineStore('game', {
    state: () => ({
        playerboard: ref({}),
        compboard: ref({}),
        ships: new battleLogic.ShipClass(),
    }),
    actions: {
        createGameboard() {
            this.playerboard = new battleLogic.Gameboard(); this.compboard = new battleLogic.Gameboard()
            this.playerboard.createBoard(); this.compboard.createBoard()
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