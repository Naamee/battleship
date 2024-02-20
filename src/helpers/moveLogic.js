import { useGameStore } from '@/stores/GameStore.js'

export const highlightCells = (highlightedCells, offset, start, shipLength, orientation) => {
    const gameStore = useGameStore()
    gameStore.generateCells()
    if (orientation === 'Horizontal') {
      let cols = shipLength
      let rows = start
      for (let i = offset; i < cols + offset; i++) {
        highlightedCells.value[`${rows}-${i}`] = true
      }
    } else {
      // Vertical
      let cols = start
      let rows = shipLength
      for (let i = offset; i < rows + offset; i++) {
        highlightedCells.value[`${i}-${cols}`] = true
      }
    }
  }

export class Move {
    constructor(cells, offset, start = 0, shipLength, orientation) {
      this.cells = cells
      this.offset = offset
      this.start = start
      this.shipLength = shipLength
      this.orientation = orientation
    }
  
    down() {
      if (this.start > 8) {
        this.start = 8
      }
      this.start++
      highlightCells(this.cells, this.offset, this.start, this.shipLength, this.orientation)
    }
  
    up() {
      if (this.start < 1) {
        this.start = 1
      }
      this.start--
      highlightCells(this.cells, this.offset, this.start, this.shipLength, this.orientation)
    }
  
    left() {
      if (this.offset < 1) {
        this.offset = 1
      }
      this.offset--
      highlightCells(this.cells, this.offset, this.start, this.shipLength, this.orientation)
    }
  
    right() {
      if (this.offset > 9-this.shipLength) {
        this.offset = 9-this.shipLength
      }
      this.offset++
      highlightCells(this.cells, this.offset, this.start, this.shipLength, this.orientation)
    }
    rotate() {
      if (this.orientation === 'Horizontal') {
        this.orientation = 'Vertical'
      } else {
        this.orientation = 'Horizontal'
      }
      highlightCells(this.cells, this.offset, this.start, this.shipLength, this.orientation)
    }
  }
  