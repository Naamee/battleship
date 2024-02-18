<script setup>
import { ref, onMounted } from 'vue'
import { useGameStore } from '@/stores/GameStore'
import GameBoard from '@/components/GameBoard.vue'

const gameStore = useGameStore()
const playerboard = ref(gameStore.playerboard.board)
const compboard = ref(gameStore.compboard.board)


onMounted(() => {
  gameStore.createGameboard()
  gameStore.playerPlaceShip('cruiser', 0, 0)
  gameStore.compPlaceShip('cruiser', 1, 1)
  gameStore.compPlaceShip('cruiser', 0, 0, 'Horizontal')
  playerboard.value = gameStore.playerboard.board
  compboard.value = gameStore.compboard.board
})
</script>

<template>
  <div class="main-game-container">
    <div>
      <p>Player</p>
      <GameBoard :gameboard="playerboard" />
    </div>
    <div>
      <p>Computer</p>
      <GameBoard :gameboard="compboard" />
    </div>
  </div>
</template>
