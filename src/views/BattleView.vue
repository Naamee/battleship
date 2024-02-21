<script setup>
import { ref } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import GameMain from '@/components/GameMain.vue';
import ShipMain from '@/components/ShipMain.vue';

const shipClass = ref(null)

const fetchShipClass = (ship) => {
  shipClass.value = ship
}
</script>

<template>
  <header class="flex justify-center mt-5">
    <TheHeader/>
  </header>
  <main class="mt-4">
    <GameMain :ship-class="shipClass" />
    <div class="flex flex-col items-center mt-5 border-t">
      <ShipMain @place-ship="fetchShipClass"/>
      <p class="text-white text-2xl">Your Turn!</p>
      <p class="text-white text-2xl">Enemy is Attacking!</p>
    </div>
  </main>
</template>
