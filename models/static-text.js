const values = require('../src/values')

function StaticText(id, x, y, w, h, text, cpl, font, color, textSize) {
  this.id = id
  this.x = x
  this.y = y
  this.w = w
  this.h = h
  this.ts = textSize
  this.cpl = cpl
  this.text = text
  this.font = font || 'Arial'
  this.color = color || StaticText.dColor
  this.update = () => { }
  this.render = (dy = 0) => {
    let { ui } = values.game.ctx
    if (!ui.needsRefresh) return
    let cpl = this.cpl || this.text.length
    let i = 0, j = 0, line = 0
    while (i < this.text.length) {
      j += cpl
      j < text.length && (j = text.lastIndexOf(' ', j) + 1)
      j <= i && (j = i + cpl)
      let { ctx } = ui
      ctx.font = (this.ts || Math.floor(this.h * values.canvasHeight)) + 'px ' + this.font
      ctx.fillStyle = this.color
      ctx.fillText(
        this.text.substr(i, j - i),
        Math.floor(this.x * values.canvasWidth),
        Math.floor((this.y - dy + line * this.h) * values.canvasHeight),
        Math.floor(this.w * values.canvasWidth)
      )
      line++
      i = j
    }
  }
}

StaticText.dColor = '#ffffff'

module.exports = StaticText
