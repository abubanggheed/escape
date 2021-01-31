const { ctx } = require('../src/values')

function Opt (x, y, width, height, onSelect, text, font, margine, onHighlight, highlightColor) {
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
    ctx.fillStyle = this.hc || Opt.defHc
    ctx.fillRect(this.x, this.y, this.w, this.h)
  })
  this.render = () => {
    ctx.font = this.h - 2 * this.m + 'px ' + this.font
    ctx.fillStyle = 'white'
    ctx.fillText(this.text, this.x + this.m, this.y + this.m, this.w - 2 * this.m)
    ctx.fillStyle = 'black'
    ctx.strokeText(this.text, this.x + this.m, this.y + this.m, this.w - 2 * this.m)
  }
}

Opt.defHc = 'rbga(10, 30, 200, 0.5)'

module.exports = Opt