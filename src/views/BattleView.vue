<script setup>
import TheHeader from '@/components/TheHeader.vue';
import GameBoard from '@/components/GameBoard.vue';
</script>

<template>
  <header class="flex justify-center mt-5">
    <TheHeader />
  </header>
  <main class="mt-4">
    <div class="container flex justify-center space-x-4">
          <GameBoard />
          <GameBoard />
    </div>
  </main>
</template>
