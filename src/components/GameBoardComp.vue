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
const firstsOccurrence = []

const isFirstOccurrence = (element) => {
  if (!firstsOccurrence.includes(element[0])) {
    firstsOccurrence.push(element[0])
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
  firstsOccurrence.length = 0
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
        <div class="h-full relative">
          <img v-if="isHit(element)" src="@/assets/smoke.gif" class="absolute brightness-200 drop-shadow-md animate-pulse blur-sm z-10 h-10 w-10 bottom-0"/>
          <img
          src="@/assets/ship.png"
          alt="ship"
          class="h-full object-cover contrast-150 saturate-200 shake"
          :class="{'hidden': !isHit(element), 'object-left': isFirstOccurrence(element), 'rotate-90': isVertical(element, array)}"
        />
        <CloseIcon v-if="isMiss(element)" class="shake"/>     
        </div>
      </div>
    </div>
  </div>
</template>

<style scope>
.shake {
  animation: shake 0.50s cubic-bezier(0.10, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(1px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-2px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(2px, 0, 0);
  }
}
</style>

