<script setup>
import { ref, onMounted } from 'vue';
import { useBattleStore } from '@/stores/battleStore';

const battleStore = useBattleStore();
const Gameboard = ref(battleStore.gameboard.board);

onMounted(() => {
    battleStore.createGameboard();
});

</script>

<template>
    <div class="bg-red-500 text-white text-2xl">{{ Gameboard }}</div>
    <div v-for="(array, key) in Gameboard" :key="key">
      <h3>{{ key }}</h3>
      <ul>
        <li v-for="(element, index) in array" :key="index">
          {{ element }}
        </li>
      </ul>
    </div>
</template>