<script setup>
import carrier from '@/assets/carrier.png';
import heart from '@/components/icons/heart.vue';
import { useGameStore } from '@/stores/GameStore';

const gameStore = useGameStore();

const ships = gameStore.ships
const shipNames = Object.keys(ships) // ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer']

const isSunk = (ship) => {
    if (ship.sunk) {
        return 'Sunk'
    } else {
        return 'Operational'
    }
}
</script>

<template>
    <div class="mt-5 justify-center text-sm text-gray-200">
        <div v-for="([key, value]) in Object.entries(ships)" :key="key" class="flex mt-1">
            <div class="flex capitalize p-1 w-32 items-baseline border rounded-sm">
            <!--ship name-->
            <p class="mr-2">{{ key }}</p>
            <!--ship length-->
            <div class="flex">
                <heart  v-for="length in value.length" :key="length"/>
            </div>
             </div> 
        <div class="flex ml-4">
            <button class="p-1 px-4 border border-white rounded-full">Place Ship</button>
        </div>
    </div>
    </div>
</template>