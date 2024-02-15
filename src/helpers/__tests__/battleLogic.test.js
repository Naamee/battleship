import { expect, test } from 'vitest'
import { Ship, Gameboard } from '../battleLogic'


test('Ship is created with length, hits, and sunk status', () => {
    const testShip = new Ship(3, 0)
    expect(testShip.length).toBe(3) //length of ship
    expect(testShip.hits).toBe(0) //number of hits
    expect(testShip.sunk).toBe(false) //sunk status
    })

test('Ship hit method increases hits and checks if ship is sunk', () => {
    const testShip = new Ship(3, 0)
    testShip.hit()
    expect(testShip.hits).toBe(1)
    testShip.hit()
    expect(testShip.hits).toBe(2)
    testShip.hit()
    expect(testShip.hits).toBe(3)
    expect(testShip.sunk).toBe(true)
    })

test('Gameboard is created with a 10x10 board and empty ships array', () => {
    const testGame = new Gameboard()
    testGame.createBoard()
    expect(testGame.board.length).toBe(10) //length of board
    expect(testGame.board[0].length).toBe(10) //width of board
    expect(testGame.ships).toEqual({}) 
    })

test('Gameboard can place a ship on the board', () => {
    const testGame = new Gameboard()
    testGame.createBoard()
    const testShip = new Ship(3, 0)
    testGame.placeShip(testShip, 0, 0, 'Horizontal')
    expect(testGame.board[0][0]).toBe('1')
    expect(testGame.board[0][1]).toBe('1')
    expect(testGame.board[0][2]).toBe('1')
    })

test('Gameboard can place a ship on the board vertically', () => {
    const testGame = new Gameboard()
    testGame.createBoard()
    const testShip = new Ship(3, 0)
    testGame.placeShip(testShip, 0, 0, 'Vertical')
    expect(testGame.board[0][0]).toBe('1')
    expect(testGame.board[1][0]).toBe('1')
    expect(testGame.board[2][0]).toBe('1')
    })

test('Gameboard can correctly place multiple ships on the board', () => {
    const testGame = new Gameboard()
    testGame.createBoard()
    const testShip = new Ship(3, 0)
    const testShip2 = new Ship(3, 0)
    testGame.placeShip(testShip, 3, 5, 'Horizontal')
    testGame.placeShip(testShip2, 0, 0, 'Vertical')
    expect(testGame.board[5][3]).toBe('1')
    expect(testGame.board[5][4]).toBe('1')
    expect(testGame.board[5][5]).toBe('1')
    expect(testGame.board[0][0]).toBe('2')
    expect(testGame.board[1][0]).toBe('2')
    expect(testGame.board[2][0]).toBe('2')
    })

test ('Gameboard prevent placing ships on top of each other', () => {
    const testGame = new Gameboard()
    testGame.createBoard()
    const testShip = new Ship(3, 0)
    const testShip2 = new Ship(3, 0)
    testGame.placeShip(testShip, 3, 5, 'Horizontal')
    expect(() => testGame.placeShip(testShip2, 3, 5, 'Horizontal')).toThrow('Ship already placed here')
    })

test('Gameboard keeps track of missed shots', () => {
    const testGame = new Gameboard()
    testGame.createBoard()
    testGame.receiveAttack(0, 0)
    expect(testGame.missedShots).toBe(1)
    testGame.receiveAttack(0, 0)
    expect(testGame.missedShots).toBe(2)
    }
)

test('Gameboard can receive an attack and check if a ship is hit', () => {
    const testGame = new Gameboard()
    testGame.createBoard()
    const testShip = new Ship(3, 0)
    testGame.placeShip(testShip, 0, 0, 'Horizontal')
    testGame.receiveAttack(0, 0)
    expect(testShip.hits).toBe(1)
    })

test('Gameboard can check if all ships have sunk', () => {
    const testGame = new Gameboard()
    testGame.createBoard()
    const testShip = new Ship(1, 0)
    const testShip2 = new Ship(1, 0)
    testGame.placeShip(testShip, 0, 0, 'Horizontal')
    testGame.placeShip(testShip2, 0, 1, 'Horizontal')
    testGame.receiveAttack(0, 0)
    testGame.receiveAttack(0, 1)
    expect(testGame.allSunk).toBe(true)
    })