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
    const { ctx, canvasWidth, canvasHeight } = values
    ctx.fillStyle = this.hc || Opt.defHc
    ctx.strokeStyle = this.hc || Opt.defHc
    ctx.fillRect(this.x * canvasWidth, this.y * canvasHeight, this.w * canvasWidth, this.h * canvasHeight)
  })
  this.hFrozen = (() => {
    const { ctx, canvasWidth, canvasHeight } = values
    ctx.fillStyle = Opt.fhc
    ctx.strokeStyle = Opt.fhc
    ctx.fillRect(this.x * canvasWidth, this.y * canvasHeight, this.w * canvasWidth, this.h * canvasHeight)
  })
  this.render = () => {
    const { ctx, canvasWidth, canvasHeight } = values
    ctx.font = (this.h - 2 * this.m) * canvasHeight + 'px ' + this.font
    ctx.fillStyle = '#000000'
    ctx.strokeStyle = '#ffffff'
    ctx.fillText(this.text, (this.x + this.m) * canvasWidth, (this.y + this.h - this.m) * canvasHeight, (this.w - 2 * this.m) * canvasWidth)
    ctx.strokeText(this.text, (this.x + this.m) * canvasWidth, (this.y + this.h - this.m) * canvasHeight, (this.w - 2 * this.m) * canvasWidth)
  }
}

Opt.defHc = 'rgba(10, 30, 200, 0.5)'
Opt.fhc = 'rgba(100, 100, 100, 0.5)'

module.exports = Opt