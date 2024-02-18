<script setup>
import { ref, onMounted } from 'vue';
import { useBattleStore } from '@/stores/battleStore';

const battleStore = useBattleStore();
const gameboard = ref(battleStore.gameboard.board);

onMounted(() => {
  battleStore.createGameboard();
  gameboard.value = battleStore.gameboard.board;
});
</script>

<template>
  <div class="flex">
    <div v-for="(array, key) in gameboard" :key="key">
      <div v-for="(element, index) in array" :key="index" class="bg-sky-500 border border-blue-900 w-5 h-5"></div>
    </div>
  </div>
</template>