<script setup>
import TheHeader from '@/components/TheHeader.vue';
import GameBoard from '@/components/GameBoard.vue';
</script>

<template>
  <header class="flex justify-center mt-5">
    <TheHeader />
  </header>
  <main>
    <div>
      <GameBoard />
      <GameBoard />
    </div>
  </main>
</template>
