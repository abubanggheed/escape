const Game = require('./models/game')
const { renderRate } = require('./util/constants')
const values = require('./src/values')
const { clearAllPressed } = require('./src/commands')

let game
const mainLoop = () => {
  values.ctx.restore()
  game.update()
  values.ctx.clearRect(0, 0, values.canvasWidth, values.canvasHeight)
  game.render()
  clearAllPressed()
}
window.onload = () => {
  let canvas = document.createElement('canvas')
  document.getElementById('root').appendChild(canvas)
  canvas.id = 'canvas'
  canvas.width = values.canvasWidth
  canvas.height = values.canvasHeight
  values.canvas = canvas
  values.ctx = canvas.getContext('2d')
  values.ctx.save()
  game = new Game()
  game.addComponents(...require('./views/main-menu')())
  setInterval(mainLoop, renderRate)
}
