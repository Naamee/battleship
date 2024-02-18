<script setup>
import GameBoard from '@/components/GameBoard.vue'
</script>

<template>
    <div class="main-game-container">
      <div>
        <p>Player</p>
        <GameBoard />
      </div>
      <div>
        <p>Computer</p>
        <GameBoard />
      </div>
    </div>
</template>