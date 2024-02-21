<script setup>
import { ref, watch } from 'vue';
import ShipMessage from './ShipMessage.vue';
import GameButtons from './GameButtons.vue';
import { useGameStore } from '@/stores/GameStore';

const gameStore = useGameStore();
const ships = gameStore.ships
const placedShips = gameStore.placedShips
const gameStart = ref(gameStore.gameStarted)

defineEmits(['placeShip'])

watch(() => gameStore.gameStarted, (newVal) => {
    gameStart.value = newVal
})
</script>

<template>
    <ShipMessage v-if="gameStore.placedShips.length!==5" message="Place your ships on the board."/>
    <div class="flex mt-5 justify-center ">
        <div v-for="([key, value]) in Object.entries(ships)" :key="key" class="flex mt-1">
            <div class="flex justify-center p-1 w-32">
            <!--ship name-->
            <button @click="$emit('placeShip', [key, value])" class="mr-2 capitalize text-sm text-gray-200 hover:text-white transition ease-in-out duration-300 hover:scale-125 border border-transparent p-4 rounded-md hover:border-white  disabled:no-underline disabled:text-green-500 disabled:border-transparent disabled:scale-100" :disabled="placedShips.includes(key)">{{ key }}</button>
             </div> 
    </div>
    </div>
    <GameButtons v-if="!gameStart" @game-start="sendStart"/>
</template>