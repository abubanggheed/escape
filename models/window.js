const values = require('../src/values')

function Window(id, x, y, width, height, color, bColor) {
  this.id = id
  this.x = x
  this.y = y
  this.w = width
  this.h = height
  this.color = color
  this.bColor = bColor

  this.render = () => {
    let { ctx } = values
    ctx.fillStyle = this.color
    ctx.strokeStyle = this.bColor || this.color
    ctx.fillRect(this.x * values.canvasWidth, this.y * values.canvasHeight, this.w * values.canvasWidth, this.h * values.canvasHeight)
  }
  this.update = () => { }
}

Window.text = () => new Window(0, 0.8, 1, 0.2, values.windowColor, values.windowBorderColor)

Window.textOpts = (num = 2, per = 0.1) => new Window(
  (1 - per), 0.8 - num * 0.08,
  (1 - per), num * 0.08,
  values.windowColor, values.windowBorderColor
)

module.exports = Window
