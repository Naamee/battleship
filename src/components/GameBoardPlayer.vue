<script setup>
import { ref, watch, onUpdated } from 'vue'
import * as moveLogic from '@/helpers/moveLogic'
import { useGameStore } from '@/stores/GameStore'

const props = defineProps({
  gameboard: Object,
  shipClass: Object
})

const myBoard = ref(null)
const firstOccurrence = []
const gameStore = useGameStore()
const highlightedCells = ref(gameStore.cells)
const isEmpty = (element) => element === '0'
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
  if (!firstOccurrence.includes(element)) {
    firstOccurrence.push(element)
    return true
  }
  return false
}

const isVertical = (element, array) => {
  let count = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i] == element) {
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
  <p>Player</p>
  <div ref="myBoard" tabindex="0" class="focus:outline-none">
    <div v-for="(array, key) in props.gameboard" :key="key" class="flex">
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
          v-if="!isEmpty(element)"
          src="@/assets/ship.png"
          alt="ship"
          class="h-full object-cover grayscale contrast-150"
          :class="{'object-left': isFirstOccurrence(element), 'rotate-90': isVertical(element, array)}"
        />
      </div>
    </div>
  </div>
</template>
