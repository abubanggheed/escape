const Window = require('../window')
const values = require('../../src/values')
const { renderRate } = require('../../util/constants')
const { cmds } = require('../../src/commands')

function Speech (text, options = {}) {
  this.text = text
  this.face = options.face
  this.i = 0
  this.j = 0
  this.fi = 0
  this.p = options.p || 0
  this.auto = options.autoComplete
  this.fw = options.faceWidth
  this.fh = options.faceHeight
  this.fa = options.faceArray
  this.ms = options.mouthSpeed
  this.mi = 0
  this.wc1 = options.windowColor1 || Speech.defaultWc1
  this.wc2 = options.windowColor2 || Speech.defaultWc2
  this.tc = options.textColor || Speech.defaultTc
  this.font = options.font || Speech.defaultFont
  this.complete = false
  this.window = new Window('', 0, 0.8 - 0.2 * this.p, 1, 0.2, this.wc1, this.wc2, Speech.wbc)
  values.game.ctx.ui.tr()
  this.update = () => {
    if (cmds.ok.pressed) {
      if (this.j < this.text.length) {
        this.j = this.text.length
        values.game.ctx.ui.tr()
      } else {
        this.complete = true
        values.game.ctx.ui.tr()
      }
    }
    if (this.j < this.text.length) {
      values.game.ctx.ui.tr()
      this.j += values.cps * renderRate / 1000
      this.mi+= this.ms * renderRate / 1000
      this.mi >= this.ms && (this.fi++, this.mi = 0)
    }
  }
  this.render = () => {
    this.window.render()
    if (!values.game.ctx.ui.needsRefresh) return
    const { ctx } = values.game.ctx.ui
    let displayText = this.text.substr(0, Math.trunc(this.j))
    let index = 0, jndex = 0, line = 0
    while (index < displayText.length) {
      jndex += Speech.cpl
      jndex < displayText.length && (jndex = displayText.lastIndexOf(' ', jndex) + 1)
      jndex <= index && (jndex = index + Speech.cpl)
      ctx.font = Speech.ts + 'px ' + this.font
      ctx.fillStyle = this.tc
      let x = this.face ? this.fw : 0
      let y = 0.85 - 0.2 * this.p
      let w = this.face ? 1 - this.fw : 1
      ctx.fillText(
        displayText.substr(index, jndex - index),
        Math.floor(x * values.canvasWidth),
        Math.floor((y + line * 0.05) * values.canvasHeight),
        Math.floor(w * values.canvasWidth)
      )
      line++
      index = jndex
    }
    if (this.j >= this.text.length) {
      ctx.beginPath()
      ctx.moveTo(Math.floor(.97 * values.canvasWidth), Math.floor(.97 * values.canvasHeight))
      ctx.lineTo(Math.floor(.98 * values.canvasWidth), Math.floor(.99 * values.canvasHeight))
      ctx.lineTo(Math.floor(.99 * values.canvasWidth), Math.floor(.97 * values.canvasHeight))
      ctx.fill()
    }
  }
}

Speech.defaultWc1 = values.windowColor
Speech.defaultWc2 = values.windowColor2
Speech.defaultTc = '#FFFFFF'
Speech.defaultFont = 'Arial'
Speech.wbc = values.windowBorderColor
Speech.cpl = 60
Speech.ts = 25

module.exports = Speech
