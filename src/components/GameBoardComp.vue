<script setup>
import { onUpdated } from 'vue'
import { useGameStore } from '@/stores/GameStore';
import CloseIcon from '@/components/icons/CloseIcon.vue'

const props = defineProps({
  gameboard: Object
})

const gameStore = useGameStore()
const isEmpty = (element) => element[0] === '0';
const isHit = (element) => element[1] === 'X';
const isMiss = (element) => element[1] === 'M';
const firstOccurrence = []

const isFirstOccurrence = (element) => {
  if (!firstOccurrence.includes(element[0])) {
    firstOccurrence.push(element[0])
    return true
  }
  return false
}

const isVertical = (element, array) => {
  let count = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i][0] === element[0]) {
      count++
    }
  }
  if (count == 1) { 
    return true
  }
  return false
}

// clear firstOccurrence array when gameboard is updated to prevent firstOccurrence from breaking
onUpdated(() => {
  firstOccurrence.length = 0
})
</script>

<template>
  <p>Computer</p>
  <div>
    <div v-for="(array, key) in props.gameboard" :key="key" class="flex">
      <div
        v-for="(element, index) in array"
        :key="index"
        class="bg-water bg-cover border border-dashed border-blue-100 w-5 h-5 hover:border-4  hover:border-blue-800 active:bg-sky-700 active:border-4 active:border-red-900"
        :class="{'border-none': !isEmpty(element) && isHit(element)}"  
        @click="gameStore.playerAttack(index, key)"    
        >
        <img
          src="@/assets/ship.png"
          alt="ship"
          class="h-full object-cover contrast-150 saturate-200"
          :class="{'hidden': !isHit(element), 'object-left': isFirstOccurrence(element), 'rotate-90': isVertical(element, array)}"
        />
        <CloseIcon v-if="isMiss(element)" />     
      </div>
    </div>
  </div>
</template>
