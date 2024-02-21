<script setup>
import { ref, onMounted, watch } from 'vue'
import { useGameStore } from '@/stores/GameStore'
import GameBoardPlayer from '@/components/GameBoardPlayer.vue'
import GameBoardComp from '@/components/GameBoardComp.vue'

const startGame = ref(false)
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

// watch for changes in the player board
watch(() => gameStore.playerboard.board, (newVal) => {
  playerboard.value = newVal
})
</script>

<template>
  <div class="main-game-container">
    <div>
      <GameBoardPlayer :gameboard="playerboard" :shipClass="props.shipClass" />
    </div>
    <div v-if="startGame">
      <GameBoardComp :gameboard="compboard" />
    </div>
  </div>
</template>
