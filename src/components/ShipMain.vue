<script setup>
import heartIcon from '@/components/icons/heartIcon.vue';
import { useGameStore } from '@/stores/GameStore';

const gameStore = useGameStore();

const ships = gameStore.ships
</script>

<template>
    <div class="mt-5 justify-center text-sm text-gray-200">
        <div v-for="([key, value]) in Object.entries(ships)" :key="key" class="flex mt-1">
            <div class="flex capitalize p-1 w-32">
            <!--ship name-->
            <p class="mr-2">{{ key }}</p>
             </div> 
        <div class="flex ml-4">
            <button class="p-1 px-4 border border-white rounded-full">Place Ship</button>
        </div>
    </div>
    </div>
</template>