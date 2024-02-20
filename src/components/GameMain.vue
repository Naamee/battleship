<script setup>
import { ref, onMounted } from 'vue'
import { useGameStore } from '@/stores/GameStore'
import GameBoardPlayer from '@/components/GameBoardPlayer.vue'
import GameBoardComp from '@/components/GameBoardComp.vue'

const gameStore = useGameStore()
const playerboard = ref(gameStore.playerboard.board)
const compboard = ref(gameStore.compboard.board)

const props = defineProps({
  shipClass: Object
})

onMounted(() => {
  gameStore.createGameboard()
  playerboard.value = gameStore.playerboard.board
  compboard.value = gameStore.compboard.board
})
</script>

<template>
  <div class="main-game-container">
    <div>
      <GameBoardPlayer :gameboard="playerboard" :shipClass="props.shipClass" />
    </div>
    <div>
      <GameBoardComp :gameboard="compboard" />
    </div>
  </div>
</template>
