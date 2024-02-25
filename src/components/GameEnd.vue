<script setup>
import { useGameStore } from '@/stores/GameStore';

const gameStore = useGameStore();
</script>

<template>
    <div class="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-900/90 to-indigo-800/90 py-8 px-24 border border-gray-100/25">
        <p v-if="gameStore.gameStatus.winner === 'player'" class="text-emerald-100 text-2xl">You Win!!</p>
        <p v-else class="text-white">Wow! You Lost!?</p>
        <button @click="this.$router.go()" class="text-white/50 text-sm mt-2 animate-pulse hover:underline hover:animate-none hover:text-white">Play Again?</button>
    </div>
</template>