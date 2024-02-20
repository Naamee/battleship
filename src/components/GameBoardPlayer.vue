<script setup>
import { onMounted, ref, watch } from 'vue'
import * as moveLogic from '@/helpers/moveLogic'
import { useGameStore } from '@/stores/GameStore'

const props = defineProps({
  gameboard: Object,
  shipClass: Object
})

const myBoard = ref(null)
const gameStore = useGameStore()
const highlightedCells = ref(gameStore.cells)
const isEmpty = (element) => element === '0'
let handleKeydown = null;

const moveShip = (move, previousListener) => {
  const gameStore = useGameStore()
  myBoard.value.focus()

  if (previousListener) {
    myBoard.value.removeEventListener('keydown', previousListener, true)
  }


  handleKeydown = (e) => {
    e.preventDefault()
    switch (e.key) {    
      case 'ArrowDown':
        if (move.orientation === 'Horizontal') {
          move.down()
        } else {
          move.right()
        }
        break
      case 'ArrowUp':
        if (move.orientation === 'Horizontal') {
          move.up()
        } else {
          move.left()
        }
        break
      case 'ArrowLeft':
        if (move.orientation === 'Horizontal') {
          move.left()
        } else {
          move.up()
        }
        break
      case 'ArrowRight':
        if (move.orientation === 'Horizontal') {
          move.right()
        } else {
          move.down()
        }
        break
      case 'r':
        move.rotate()
        break
      case 'Enter':
        if (move.orientation === 'Horizontal') {
          gameStore.playerPlaceShip(props.shipClass[1], move.offset, move.start, move.orientation)
          myBoard.value.removeEventListener('keydown', handleKeydown, true)
        } else {
          gameStore.playerPlaceShip(props.shipClass[1], move.start, move.offset, move.orientation)
          myBoard.value.removeEventListener('keydown', handleKeydown, true)
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

watch(() => props.shipClass, () => {
  placeShip()
})
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
