import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Gameboard } from '@/helpers/battleLogic'

export const useBattleStore = defineStore('battle', {
    state: () => ({
        gameboard: ref({}),
    }),
    actions: {
        createGameboard() {
            const newGameboard = new Gameboard()
            newGameboard.createBoard()
            this.gameboard = newGameboard
            return this.gameboard
        },
    }
})