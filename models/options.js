const { cmds } = require('../src/commands')

function Options(defaultSelected, back, selectColor, opts) {
  this.opts = opts
  this.back = back
  this.selected = defaultSelected
  this.color = selectColor
  this.addOpt = opt => {
    this.opts.push(opt)
  }
  this.next = () => {
    this.selected[1] = (this.selected[1] + 1) % this.opts[this.selected[0]].length
  }
  this.previous = () => {
    this.selected[1] = (
      this.selected[1] - 1 + this.opts[selected[0]].length
    ) % this.opts[this.selected[0]].length
  }
  this.right = () => {
    this.selected[0] = (this.selected[0] + 1) % this.opts.length
    this.selected[1] = Math.max(this.selected[1], this.opts[this.selected[0]].length - 1)
  }
  this.left = () => {
    this.selected[0] = (this.selected[0] - 1 + this.opts.length) % this.opts.length
    this.selected[1] = Math.max(this.selected[1], this.opts[this.selected[0]].length - 1)
  }
  this.update = () => {
    if (cmds.back.pressed) {
      this.opts[this.back[0]][this.back[1]].select()
    } else if (cmds.ok.pressed) {
      this.opts[this.selected[0]][this.selected[1]].select()
    } else {
      if (cmds.down.pressed) this.next()
      if (cmds.up.pressed) this.previous()
      if (cmds.right.pressed) this.right()
      if (cmds.left.pressed) this.left()
    }
  }
  this.render = () => {
    this.opts[this.selected[0]][this.selected[1]].highlight()
    this.opts.forEach(opt => opt.render())
  }
}

module.exports = Options