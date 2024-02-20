<script setup>
import ShipMessage from './ShipMessage.vue';
import { useGameStore } from '@/stores/GameStore';

const gameStore = useGameStore();
const ships = gameStore.ships
const placedShips = gameStore.placedShips
defineEmits(['placeShip'])
</script>

<template>
    <ShipMessage message="Place your ships on the board."/>
    <div class="flex mt-5 justify-center text-sm text-gray-200">
        <div v-for="([key, value]) in Object.entries(ships)" :key="key" class="flex mt-1">
            <div class="flex justify-center p-1 w-32">
            <!--ship name-->
            <button @click="$emit('placeShip', [key, value])" class="mr-2 capitalize disabled:text-red-900" :disabled="placedShips.includes(key)">{{ key }}</button>
             </div> 
    </div>
    </div>
</template>