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
    <div class="inline-flex" v-for="(array, key) in gameboard" :key="key">
      <div v-for="(element, index) in array" :key="index" class="bg-sky-100 border border-red-500 w-10 h-10"> {{ element }}</div>
    </div>
</template>