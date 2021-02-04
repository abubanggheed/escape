const values = require('../src/values')

function Context(game, canvas) {
  canvas.width = values.canvasWidth
  canvas.height = values.canvasHeight
  this.game = game
  this.canvas = canvas
  this.ctx = canvas.getContext('2d')
  this.needsRefresh = true
  this.tr = () => this.needsRefresh = true
  this.rr = () => this.needsRefresh = false
  this.clear = () => {
    this.needsRefresh && (this.ctx.clearRect(0, 0, values.canvasWidth, values.canvasHeight))
  }
}

module.exports = Context
