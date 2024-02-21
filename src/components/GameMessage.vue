<script setup>
import { useGameStore } from '@/stores/GameStore'

const gameStore = useGameStore()
</script>

<template>
  <p v-if="gameStore.playerTurn" class="text-white text-2xl">Your Turn!</p>
  <p v-if="gameStore.compTurn" class="text-white text-2xl">Enemy is Attacking!</p>
</template>
