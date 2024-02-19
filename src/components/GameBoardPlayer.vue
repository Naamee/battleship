<script setup>
import { ref } from 'vue'
import { useGameStore } from '@/stores/GameStore'

const props = defineProps({
  gameboard: Object
})

const myBoard = ref(null)
const gameStore = useGameStore()
const highlightedCells = ref(gameStore.cells)
const isEmpty = (element) => element === '0'

const highlightCell = (rowstart, rowend, colstart, colend) => {
  for (let i=rowstart; i<rowend; i++) {
    for (let j=colstart; j<colend; j++) {
      if (props.gameboard[i][j] === '0') {
        // Add the cell to the highlightedCells object
        highlightedCells.value[`${i}-${j}`] = true
      }
    }
  }
}

gameStore.generateCells()
console.log(highlightedCells.value)


</script>

<template>
  <p>Player</p>
  <div ref="myBoard" tabindex="0" class="focus:outline-none">
    <div v-for="(array, key) in props.gameboard" :key="key" class="flex">
      <div
        v-for="(element, index) in array"
        :key="index"
        class="bg-sky-500 border border-blue-900 w-5 h-5"
        :class="{ 'bg-white animate-pulse': highlightedCells[`${key}-${index}`] }"
      >
        <!--display only if element is not empty-->
        <p v-if="!isEmpty(element)">{{ element }}</p>
      </div>
    </div>
  </div>
</template>
