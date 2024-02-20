<script setup>
import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <header class="flex justify-center mt-5">
    <TheHeader />
  </header>
  <main class="mt-4">
    <div class="flex flex-col justify-center items-center h-96 mt-5 border-t">
        <button class="text-white text-2xl animate-pulse border border-white px-4 rounded-full bg-blue-300/10 hover:text-blue-300 hover:border-blue-300">
            <router-link to="/battle">START</router-link>
        </button>
        <p class="mt-2 text-white/25">Press to play game.</p>
    </div>
  </main>
</template>
