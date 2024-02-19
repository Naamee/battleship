<script setup>
import { onMounted, ref } from 'vue'
import { useGameStore } from '@/stores/GameStore'

const props = defineProps({
  gameboard: Object
})

const myBoard = ref(null)
const gameStore = useGameStore()
const highlightedCells = ref(gameStore.cells)
const isEmpty = (element) => element === '0'

const highlightCells = (offset, start, shipLength, orientation) => {
  gameStore.generateCells()
  if (orientation === 'Horizontal') {
      let cols = shipLength
      let rows = start
      for (let i = offset; i < cols+offset; i++) {
      highlightedCells.value[`${rows}-${i}`] = true
    }
  } else { // Vertical
    let cols = start
    let rows = shipLength
    for (let i = offset; i < rows+offset; i++) {
      highlightedCells.value[`${i}-${cols}`] = true
    }
  }
}

class Move {
  constructor(offset, start=0, shipLength, orientation) {
    this.offset = offset
    this.start = start
    this.shipLength = shipLength
    this.orientation = orientation
  }

  down() {
    if (this.start > 8) {
      this.start=8
    }
    this.start++
    highlightCells(this.offset, this.start, this.shipLength, this.orientation)
  }

  up() {
    if (this.start < 1) {
      this.start=1
    }
    this.start--
    highlightCells(this.offset, this.start, this.shipLength, this.orientation)
  }

  left() {
    if (this.offset < 1) {
      this.offset=1
    }
    this.offset--
    highlightCells(this.offset, this.start, this.shipLength, this.orientation)
  }

  right() {
    if (this.offset > this.shipLength-1) {
      this.offset=this.shipLength-1
    }
    this.offset++
    highlightCells(this.offset, this.start, this.shipLength, this.orientation)
  }
  rotate() {
    if (this.orientation === 'Horizontal') {
      this.orientation = 'Vertical'
    } else {
      this.orientation = 'Horizontal'
    }
    highlightCells(this.offset, this.start, this.shipLength, this.orientation)
  }
}

gameStore.generateCells()

const move = new Move(0, 3, 5, 'Horizontal')
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
        @click="move.rotate()"
      >
        <!--display only if element is not empty-->
        <p v-if="!isEmpty(element)">{{ element }}</p>
      </div>
    </div>
  </div>
</template>
