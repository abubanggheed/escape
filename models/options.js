const { cmds } = require('../src/commands')
const values = require('../src/values')

function Options(id, defaultSelected, back, opts) {
  this.id = id
  this.opts = opts
  this.back = back
  this.selected = defaultSelected
  this.frozen = false
  this.dy = 0
  this.addOpt = opt => {
    this.opts.push(opt)
  }
  this.next = () => {
    values.game.ctx.uian.tr()
    this.selected[1] = (this.selected[1] + 1) % this.opts[this.selected[0]].length
  }
  this.previous = () => {
    values.game.ctx.uian.tr()
    this.selected[1] = (
      this.selected[1] - 1 + this.opts[this.selected[0]].length
    ) % this.opts[this.selected[0]].length
  }
  this.right = () => {
    values.game.ctx.uian.tr()
    this.selected[0] = (this.selected[0] + 1) % this.opts.length
    this.selected[1] = Math.min(this.selected[1], this.opts[this.selected[0]].length - 1)
  }
  this.left = () => {
    values.game.ctx.uian.tr()
    this.selected[0] = (this.selected[0] - 1 + this.opts.length) % this.opts.length
    this.selected[1] = Math.min(this.selected[1], this.opts[this.selected[0]].length - 1)
  }
  this.getOpt = () => this.opts[this.selected[0]][this.selected[1]]
  this.freeze = () => this.frozen = !this.frozen
  this.update = () => {
    if (this.frozen) return
    if (cmds.back.pressed) {
      values.game.ctx.uian.tr()
      values.game.ctx.ui.tr()
      values.game.playSfx('back')
      this.opts[this.back[0]][this.back[1]] && this.opts[this.back[0]][this.back[1]].select()
    } else if (cmds.ok.pressed) {
      values.game.ctx.uian.tr()
      values.game.ctx.ui.tr()
      values.game.playSfx('okay')
      this.opts[this.selected[0]][this.selected[1]].select()
    } else {
      if (cmds.down.pressed) (values.game.playSfx('updown'), this.next())
      if (cmds.up.pressed) (values.game.playSfx('updown'), this.previous())
      if (cmds.right.pressed) (values.game.playSfx('leftright'), this.right())
      if (cmds.left.pressed) (values.game.playSfx('leftright'), this.left())
    }
  }
  this.render = () => {
    let { ui, uian } = values.game.ctx
    if (uian.needsRefresh) this.getOpt()[this.frozen ? 'hFrozen':'highlight'](this.dy)
    if(ui.needsRefresh) this.opts.forEach(list => list.forEach(opt => opt.render(this.dy)))
  }
}

module.exports = Options
