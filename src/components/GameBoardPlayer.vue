<script setup>
import { ref, watch, onUpdated } from 'vue'
import * as moveLogic from '@/helpers/moveLogic'
import { useGameStore } from '@/stores/GameStore'
import CloseIcon from './icons/CloseIcon.vue';

const props = defineProps({
  gameboard: Object,
  shipClass: Object
})

const myBoard = ref(null)
const firstOccurrence = []
const gameStore = useGameStore()
const highlightedCells = ref(gameStore.cells)
const isEmpty = (element) => element[0] === '0'  
const isHit = (element) => element[1] === 'X';
const isMiss = (element) => element[1] === 'M';
let handleKeydown = null;

const moveShip = (move, previousListener) => {
  const gameStore = useGameStore()
  myBoard.value.focus()

  // remove previous listener if it exists
  if (previousListener) {
    myBoard.value.removeEventListener('keydown', previousListener, true)
  }

  handleKeydown = (e) => {
    e.preventDefault()
    switch (e.key) {
      case 's':
        if (move.orientation === 'Horizontal') {
          move.down()
        } else {
          move.right()
        }
        break
      case 'w':
        if (move.orientation === 'Horizontal') {
          move.up()
        } else {
          move.left()
        }
        break
      case 'a':
        if (move.orientation === 'Horizontal') {
          move.left()
        } else {
          move.up()
        }
        break
      case 'd':
        if (move.orientation === 'Horizontal') {
          move.right()
        } else {
          move.down()
        }
        break
      case 'r':
        move.rotate()
        break
      case 'e':
        if (move.orientation === 'Horizontal') {
          if (gameStore.playerPlaceShip(props.shipClass[0], props.shipClass[1], move.offset, move.start, move.orientation) === true) {
            myBoard.value.removeEventListener('keydown', handleKeydown, true)
            gameStore.generateCells() //clear highlighted cells
          }

        } else {
          if (gameStore.playerPlaceShip(props.shipClass[0], props.shipClass[1], move.start, move.offset, move.orientation) === true) {
            myBoard.value.removeEventListener('keydown', handleKeydown, true)
            gameStore.generateCells() //clear highlighted cells
          }
        }
        break
    }
  }
  myBoard.value.addEventListener('keydown', handleKeydown, true)
}

const placeShip = () => {
  gameStore.generateCells()
  const move = new moveLogic.Move(highlightedCells, 0, 0, props.shipClass[1].length, 'Horizontal')
  move.up()
  moveShip(move, handleKeydown)
}

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
    if (array[i][0] == element[0]) {
      count++
    }
  }
  if (count == 1) {
    return true
  }
  return false
}

watch(() => props.shipClass, () => {
  placeShip() //place ship when ship is selected
})

// clear firstOccurrence array when gameboard is updated to prevent firstOccurrence from breaking
onUpdated(() => {
  firstOccurrence.length = 0
})
</script>

<template>
  <p class="flex justify-center sm:flex-none sm:justify-normal">Player</p>
  <div ref="myBoard" tabindex="0" class="focus:outline-none">
    <div v-for="(array, key) in props.gameboard" :key="key" class="flex justify-center sm:justify-normal">
      <div
        v-for="(element, index) in array"
        :key="index"
        class="bg-water bg-cover border border-dashed border-blue-100 w-5 h-5"
        :class="{
          'bg-none bg-blue-100  border-2 border-gray-700': highlightedCells[`${key}-${index}`],
          'border-none ': !isEmpty(element)
        }"
      >
        <!--display only if element is not empty-->
        <img
          v-if="!isEmpty(element) && !isHit(element) && !isMiss(element)"
          src="@/assets/ship.png"
          alt="ship"
          class="h-full object-cover grayscale contrast-150"
          :class="{'object-left': isFirstOccurrence(element), 'rotate-90': isVertical(element, array)}"
        />
        <div class="h-full relative">
          <img v-if="isHit(element)" src="@/assets/smoke.gif" class="absolute brightness-200 drop-shadow-md animate-pulse z-10"/>
          <img
            v-if="isHit(element)"
            src="@/assets/ship.png"
            alt="ship"
            class="h-full object-cover contrast-150 saturate-200"
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
