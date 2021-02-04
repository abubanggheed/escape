const values = require('../src/values')

function Window(id, x, y, width, height, color, color2, bColor) {
  this.id = id
  this.x = x
  this.y = y
  this.w = width
  this.h = height
  this.color = color
  this.color2 = color2
  this.bColor = bColor

  this.render = () => {
    let ui = values.game.ctx.ui
    if (!ui.needsRefresh) return
    let { ctx } = ui
    let ax = Math.floor(this.x * values.canvasWidth), ay = Math.floor(this.y * values.canvasHeight), aw = Math.floor(this.w * values.canvasWidth), ah = Math.floor(this.h * values.canvasHeight)
    let grad = ctx.createLinearGradient(ax, ay, ax + aw, ay + ah)
    grad.addColorStop(0, `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.color[3]})`)
    grad.addColorStop(1, `rgba(${this.color2[0]}, ${this.color2[1]}, ${this.color2[2]}, ${this.color2[3]})`)
    ctx.fillStyle = grad
    ctx.strokeStyle = this.bColor || this.color
    ctx.fillRect(ax, ay, aw, ah)
    ctx.strokeRect(ax, ay, aw, ah)
  }
  this.update = () => { }
}

Window.text = (id, p = 0) => new Window(id, 0, 0.8 - 0.2 * p, 1, 0.2, values.windowColor, values.windowColor2, values.windowBorderColor)

Window.textOpts = (id, num = 2, per = 0.1) => new Window(
  id, (1 - per), 0.80 - num * 0.07, (1 - per), num * 0.07,
  values.windowColor, values.windowColor2, values.windowBorderColor
)

module.exports = Window
