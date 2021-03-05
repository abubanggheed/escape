const Options = require('./options');

function ScrollingOptions(id, defaultSelected, back, opts, y, height) {
  Options.call(this, id, defaultSelected, back, opts)
  this.y = y
  this.dy = 0
  this.h = height
  const fixUpDown = () => {
    let opt = this.getOpt()
    if (opt.y < this.y + this.dy) {
      this.dy = opt.y - this.y
      values.game.ctx.ui.tr()
    } else if (opt.y + opt.h > this.y + this.h + this.dy) {
      this.dy = opt.y + opt.h - this.y - this.h
      values.game.ctx.ui.tr()
    }
  }
  this.next = () => {
    values.game.ctx.uian.tr()
    this.selected[1] += 1
    if (this.selected[1] >= this.opts[this.selected[0]].length) {
      values.game.ctx.ui.tr()
      this.selected[1] = 0
      this.dy = 0
    } else {
      fixUpDown()
    }
  }
  this.previous = () => {
    values.game.ctx.uian.tr()
    this.selected[1] -= 1
    if (this.selected[1] < 0) {
      this.selected[1] = this.opts[this.selected[0]].length - 1
    }
    fixUpDown()
  }
  this.right = () => {
    values.game.ctx.uian.tr()
    this.selected[0] = (this.selected[0] + 1) % this.opts.length
    this.selected[1] = Math.min(this.selected[1], this.opts[this.selected[0]].length - 1)
    fixUpDown()
  }
  this.left = () => {
    values.game.ctx.uian.tr()
    this.selected[0] = (this.selected[0] - 1 + this.opts.length) % this.opts.length
    this.selected[1] = Math.min(this.selected[1], this.opts[this.selected[0]].length - 1)
    fixUpDown()
  }
  this.render = () => {
    let { ui, uian } = values.game.ctx
    if (uian.needsRefresh) this.getOpt()[this.frozen ? 'hFrozen' : 'highlight'](this.dy)
    if (ui.needsRefresh) this.opts.forEach(list => list.forEach(opt => (
      (opt.y < this.y + this.dy + this.h && opt.y + opt.h > this.y + this.dy) && opt.render(this.dy)
    )))
  }
}

module.exports = ScrollingOptions
