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
  this.highlight = onHighlight || (() => {
    const { game, canvasWidth, canvasHeight } = values
    const { ctx } = game.ctx.uian
    ctx.fillStyle = this.hc || Opt.defHc
    ctx.fillRect(Math.floor(this.x * canvasWidth), Math.floor(this.y * canvasHeight), Math.floor(this.w * canvasWidth), Math.floor(this.h * canvasHeight))
  })
  this.hFrozen = (() => {
    const { game, canvasWidth, canvasHeight } = values
    const { ctx } = game.ctx.uian
    ctx.fillStyle = Opt.fhc
    ctx.fillRect(Math.floor(this.x * canvasWidth), Math.floor(this.y * canvasHeight), Math.floor(this.w * canvasWidth), Math.floor(this.h * canvasHeight))
  })
  this.render = () => {
    const { game, canvasWidth, canvasHeight } = values
    const { ctx } = game.ctx.ui
    ctx.font = Math.floor((this.h - 2 * this.m) * canvasHeight) + 'px ' + this.font
    ctx.fillStyle = '#ffffff'
    ctx.fillText(this.text, Math.floor((this.x + this.m) * canvasWidth), Math.floor((this.y + this.h - this.m) * canvasHeight), Math.floor((this.w - 2 * this.m) * canvasWidth))
  }
}

Opt.defHc = 'rgba(10, 30, 200, 0.5)'
Opt.fhc = 'rgba(100, 100, 100, 0.5)'

module.exports = Opt