<script setup>
import { ref } from 'vue'
import { useGameStore } from '@/stores/GameStore'
import TheHeader from '@/components/TheHeader.vue'
import GameMain from '@/components/GameMain.vue'
import ShipMain from '@/components/ShipMain.vue'
import GameMessage from '@/components/GameMessage.vue'
import GameEnd from '@/components/GameEnd.vue'

const shipClass = ref(null)
const gameStore = useGameStore()

const fetchShipClass = (ship) => {
  shipClass.value = ship
}
</script>

<template>
  <div class="relative mt-5">
    <header class="flex justify-center">
      <TheHeader />
    </header>
    <main class="mt-4">
      <GameMessage v-if="gameStore.gameStarted" />
      <GameMain :ship-class="shipClass" class="mt-5" />
      <div v-if="!gameStore.gameStarted" class="flex flex-col items-center mt-5 border-t">
        <ShipMain @place-ship="fetchShipClass" />
      </div>
    </main>
    <div v-if="gameStore.gameStatus.gameEnded === true" class="absolute top-32 inset-0 flex justify-center items-center z-10">
      <GameEnd />
    </div>
  </div>
</template>
