const fs = require('fs');
const { setUp } = require('./src/set-up')
const Game = require('./models/game')
const Context = require('./models/context')
const { renderRate } = require('./util/constants')
const values = require('./src/values')
const { clearAllPressed } = require('./src/commands')

let game
const mainLoop = () => {
  game.update()
  game.render()
  clearAllPressed()
}
window.onload = () => {
  let bg = document.getElementById('bg')
  let map = document.getElementById('map')
  let an = document.getElementById('an')
  let tint = document.getElementById('tint')
  let ui = document.getElementById('ui')
  let uian = document.getElementById('uian')
  game = new Game()
  values.game = game
  game.ctx.bg = new Context(game, bg)
  game.ctx.map = new Context(game, map)
  game.ctx.an = new Context(game, an)
  game.ctx.tint = new Context(game, tint)
  game.ctx.ui = new Context(game, ui)
  game.ctx.uian = new Context(game, uian)
  game.ctx.tint.ctx.fillStyle = 'rgba(200, 200, 200, 0.5)'
  game.ctx.bg.ctx.fillRect(0, 0, values.canvasWidth, values.canvasHeight)
  setUp(game).then(() => {
    require('./views/main-menu')(game)
    game.render()
    setInterval(mainLoop, renderRate)
  }).catch(console.error)
}
