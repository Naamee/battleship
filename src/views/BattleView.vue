<script setup>
import TheHeader from '@/components/TheHeader.vue'
import GameMain from '@/components/GameMain.vue';
import ShipMain from '@/components/ShipMain.vue';
</script>

<template>
  <header class="flex justify-center mt-5">
    <TheHeader />
  </header>
  <main class="mt-4">
    <GameMain />
    <div class="mt-5 border-t">
      <ShipMain />
    </div>
  </main>
</template>
