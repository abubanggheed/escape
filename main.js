const Game = require('./models/game')
const { renderRate } = require('./util/constants')
const values = require('./src/values')
const { clearAllPressed } = require('./src/commands')

let game
const mainLoop = () => {
  // clearAllPressed()
}
window.onload = () => {
  let canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  canvas.id = 'canvas'
  canvas.width = values.canvasWidth
  canvas.height = values.canvasHeight
  values.canvas = canvas
  values.context = canvas.getContext('2d')
  game = new Game()
  setInterval(mainLoop, renderRate)
}
