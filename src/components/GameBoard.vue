<script setup>
const props = defineProps({
  gameboard: Object
})

const isEmpty = (element) => element === '0';
</script>

<template>
  <div class="flex">
    <div v-for="(array, key) in props.gameboard" :key="key">
      <div
        v-for="(element, index) in array"
        :key="index"
        class="bg-sky-500 border border-blue-900 w-5 h-5"
      >
        <!--display only if element is not empty-->
        <p v-if="!isEmpty(element)">{{ element }}</p>
      </div>
    </div>
  </div>
</template>
