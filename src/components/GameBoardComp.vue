<script setup>
const props = defineProps({
  gameboard: Object
})

const isEmpty = (element) => element === '0';
</script>

<template>
  <p>Computer</p>
  <div>
    <div v-for="(array, key) in props.gameboard" :key="key" class="flex">
      <div
        v-for="(element, index) in array"
        :key="index"
        class="bg-water bg-cover border border-dashed border-blue-100 w-5 h-5 hover:border-4  hover:border-blue-800 active:bg-sky-700 active:border-4 active:border-red-900"
      >
        <!--display only if element is not empty-->
        <p v-if="!isEmpty(element)">{{ element }}</p>
      </div>
    </div>
  </div>
</template>
