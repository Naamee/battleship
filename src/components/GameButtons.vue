<script setup>
import { useGameStore } from '@/stores/GameStore';

const gameStore = useGameStore();
</script>

<template>
        <div class="flex flex-col items-center">
        <p v-if="gameStore.placedShips.length===5" class="text-white text-sm animate-pulse">Press 'Play' to Start</p>
        <div class="flex justify-center mt-5 items-center space-x-5">
            <!--Clear Button-->
            <button @click="gameStore.clearPlacedShips" class="px-5 py-1 w-20 bg-red-900 hover:bg-red-950 text-white text-sm border border-white">Clear</button>
            <!--Play Button-->
            <button @click="gameStore.startGame()" v-if="gameStore.placedShips.length===5" class="bg-blue-500 hover:bg-blue-700 text-white text-sm border border-white px-5 py-1 w-20">Play</button>
        </div>
</div>
</template>