<script setup>
import { useGameStore } from '@/stores/GameStore'

const gameStore = useGameStore()
</script>

<template>
  <div class="flex flex-col items-center">
    <p v-if="gameStore.playerTurn" class="text-white text-2xl">Your Turn!</p>
    <p v-if="gameStore.compTurn" class="text-white text-2xl">Enemy is Attacking!</p>
  </div>
</template>
