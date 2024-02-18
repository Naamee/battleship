import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Gameboard } from '@/helpers/battleLogic'

export const useBattleStore = defineStore('battle', {
    state: () => ({
        playerboard: ref({}),
        compboard: ref({}),
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