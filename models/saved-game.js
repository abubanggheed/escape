const fs = require('fs')
const Opt = require('./opt')
const Options = require('./options')
const Window = require('./window')
const StaticText = require('./static-text')
const values = require('../src/values')
const hColor = 'rgba(10, 30, 200, 0.5)'

const createConfirmDelete = (game, fileKey, opts, onDelete) => {
  game.addComponents(
    Window.text('cdWin'),
    new StaticText('cdMessage', 0.01, 0.85, 0.99, 0.04, 'Do you really want to destroy this save file?', 50),
    Window.textOpts('cdOptWin'),
    new Options(
      'confirmD', [0, 1], [0, 1],
      [[
        new Opt(
          0.9, 0.66, 0.1, 0.07,
          () => {
            game.removeComponents('confirmD', 'cdOptWin', 'cdMessage', 'cdOpts')
            game.addComponents(new StaticText('deletingMessage', 0.01, 0.85, 0.99, 0.04, 'Deleting . . .', 50))
            fs.rmdir(fileKey, { recursive: true },
              (err) => {
                err && console.error(err)
                game.removeComponents('deletingMessage')
                game.addComponents(new StaticText('deletedMessage', 0.01, 0.85, 0.99, 0.04, 'Your will has been done', 50))
                game.ctx.ui.tr()
                game.render()
                setTimeout(() => {
                  game.removeComponents('deletedMessage', 'cdWin')
                  game.ctx.ui.tr()
                  game.ctx.uian.tr()
                  opts.freeze()
                  onDelete()
                }, 1500)
              })
          },
          'Do it!', 0.01
        ),
        new Opt(
          0.9, 0.73, 0.1, 0.07,
          () => {
            game.removeComponents('confirmD', 'cdOptWin', 'cdMessage', 'cdWin')
            opts.freeze()
          }, 'no. . .', 0.01
        )
      ]]
    )
  )
}

function SavedGame(x, y, width, height, cName, fKey, onSelect, onDelete, text, margine, font) {
  Opt.call(this, x, y, width, height, onSelect, text, margine, undefined, font, hColor)
  this.fKey = fKey
  this.cName = cName
  this.spawnOpts = (game, opts) => {
    let dy = opts.dy || 0
    let newOptions = new Options(
      'cdOpts', [0, 0], [2, 0],
      [[
        new Opt(
          this.x + this.w * 0.05, this.y - dy + this.h * 0.7, this.w * 0.3, this.h * 0.25,
          () => console.log('Game Start!'),
          'continue', 0.01, undefined, undefined, 'rgba(0, 150, 0, 0.5)'
        )
      ], [
        new Opt(
          this.x + this.w * 0.4, this.y - dy + this.h * 0.7, this.w * 0.25, this.h * 0.25,
          () => {
            newOptions.freeze()
            createConfirmDelete(game, this.fKey, newOptions, onDelete)
          },
          'delete', 0.01, undefined, undefined, 'rgba(150, 0, 0, 0.5)'
        )
      ], [
        new Opt(
          this.x + this.w * 0.7, this.y - dy + this.h * 0.7, this.w * 0.25, this.h * 0.25,
          () => {
            game.removeComponents('cdOpts')
            opts.freeze()
          },
          'back', 0.01, undefined, undefined, 'rgba(20, 20, 20, 0.5)'
        )
      ]]
    )
    game.addComponents(newOptions)
  }
  this.render = (dy = 0) => {
    let { ui } = values.game.ctx
    if (ui.needsRefresh) {
      let { ctx } = ui
      let ax = Math.floor((this.x + this.m) * values.canvasWidth), ay = Math.floor((this.y - dy + this.m) * values.canvasHeight), aw = Math.floor((this.w - 2 * this.m) * values.canvasWidth), ah = Math.floor((this.h - 2 * this.m) * values.canvasHeight)
      ctx.strokeStyle = '#ffffff'
      ctx.strokeRect(ax, ay, aw, ah)
      ctx.font = '20px Arial'
      ctx.fillStyle = '#ffffff'
      ctx.fillText(this.cName, Math.floor(ax + this.m * values.canvasWidth), ay + 20)
    }

  }
}

module.exports = SavedGame