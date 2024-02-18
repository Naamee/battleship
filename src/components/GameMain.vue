<script setup>
import { ref, onMounted } from 'vue'
import { useBattleStore } from '@/stores/battleStore'
import GameBoard from '@/components/GameBoard.vue'

const battleStore = useBattleStore()
const playerboard = ref(battleStore.playerboard.board)
const compboard = ref(battleStore.compboard.board)


onMounted(() => {
  battleStore.createGameboard()
  battleStore.playerPlaceShip('cruiser',0, 0)
  battleStore.compPlaceShip('cruiser',1, 1)
  playerboard.value = battleStore.playerboard.board
  compboard.value = battleStore.compboard.board
})
</script>

<template>
    <div class="main-game-container">
      <div>
        <p>Player</p>
        <GameBoard :gameboard="playerboard"/>
      </div>
      <div>
        <p>Computer</p>
        <GameBoard :gameboard="compboard"/>
      </div>
    </div>
</template>