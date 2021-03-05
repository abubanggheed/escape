const values = require('../src/values')

function Opt (x, y, width, height, onSelect, text, margine, onHighlight, font, highlightColor) {
  this.x = x
  this.y = y
  this.w = width
  this.h = height
  this.m = margine
  this.text = text
  this.font = font || 'Arial'
  this.hc = highlightColor
  this.select = onSelect
  this.highlight = onHighlight || ((dy = 0) => {
    const { game, canvasWidth, canvasHeight } = values
    const { ctx } = game.ctx.uian
    ctx.fillStyle = this.hc || Opt.defHc
    ctx.fillRect(Math.floor(this.x * canvasWidth), Math.floor((this.y - dy) * canvasHeight), Math.floor(this.w * canvasWidth), Math.floor(this.h * canvasHeight))
  })
  this.hFrozen = (dy = 0) => {
    const { game, canvasWidth, canvasHeight } = values
    const { ctx } = game.ctx.uian
    ctx.fillStyle = Opt.fhc
    ctx.fillRect(Math.floor(this.x * canvasWidth), Math.floor((this.y - dy) * canvasHeight), Math.floor(this.w * canvasWidth), Math.floor(this.h * canvasHeight))
  }
  this.render = (dy = 0) => {
    const { game, canvasWidth, canvasHeight } = values
    if (this.y - dy < 1 && this.y + this.h - dy > 0) {
      const { ctx } = game.ctx.ui
      if (this.text && this.text.render) {
        this.text.render(dy)
      } else {
        ctx.font = Math.floor((this.h - 2 * this.m) * canvasHeight) + 'px ' + this.font
        ctx.fillStyle = '#ffffff'
        ctx.fillText(this.text, Math.floor((this.x + this.m) * canvasWidth), Math.floor((this.y - dy + this.h - this.m) * canvasHeight), Math.floor((this.w - 2 * this.m) * canvasWidth))
      }
    }
  }
}

Opt.defHc = 'rgba(10, 30, 200, 0.5)'
Opt.fhc = 'rgba(100, 100, 100, 0.5)'

module.exports = Opt