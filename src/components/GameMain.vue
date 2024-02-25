<script setup>
import { ref, watch, onMounted } from 'vue'
import { useGameStore } from '@/stores/GameStore'
import GameBoardPlayer from '@/components/GameBoardPlayer.vue'
import GameBoardComp from '@/components/GameBoardComp.vue'
import ShipControls from './ShipControls.vue'
import ShipControlButtons from './ShipControlButtons.vue'

const gameStore = useGameStore()
const playerboard = ref(gameStore.playerboard.board)
const compboard = ref(gameStore.compboard.board)

const props = defineProps({
  shipClass: Object,
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
  <div class="relative main-game-container">
    <div class="relative">
      <ShipControls v-if="!gameStore.gameStarted" class="hidden sm:flex absolute right-60 top-10 w-max"/>
      <GameBoardPlayer :gameboard="playerboard" :shipClass="props.shipClass" />
      <div class="flex mt-5">
      <ShipControls v-if="!gameStore.gameStarted" class="sm:hidden block right-60 top-10 w-max"/>
      <ShipControlButtons class="sm:hidden" v-if="!gameStore.gameStarted" />
    </div>
    </div>
    <div v-if="gameStore.gameStarted">
      <GameBoardComp :gameboard="compboard" />
    </div>
  </div>
</template>
