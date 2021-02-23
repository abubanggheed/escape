const fs = require('fs');
const Opt = require('./opt')
const Options = require('./options')
const Window = require('./window')
const StaticText = require('./static-text')
const hColor = 'rgba(10, 30, 200, 0.5)'

const createConfirmDelete = (game, fileKey, opts) => {
  game.addComponents(
    Window.text('cdWin'),
    new StaticText('cdMessage', 0, 0.8, 1, 0.2, 'Do you truly wish to destroy this save file?', 20),
    Window.textOpts('cdOptWin'),
    new Options(
      'confirmD', [0, 1], [0, 1],
      [[
        new Opt(
          0.9, 0.66, 0.1, 0.07,
          () => {
            game.removeComponents('confirmD', 'cdOptWin', 'cdMessage')
            game.addComponents(new StaticText('deletingMessage', 0, 0.8, 1, 0.2, 'Deleting . . .', 20))
            fs.rm(fileKey, () => {
              game.removeComponents('deletingMessage')
              game.addComponents(new StaticText('deletedMessage', 0, 0.8, 1, 0.2, 'You will has been done', 20))
              setTimeout(() => {
                game.removeComponents('deletedMessage', 'cdWin')
                opts.freeze()
              }, 1000)
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

function SavedGame(x, y, width, height, fileKey, onSelect, text, margine, font) {
  Opt.call(this, x, y, width, height, onSelect, text, margine, undefined, font, hColor)
  this.fileKey = fileKey
  this.spawnOpts = (game, opts) => {
    let newOptions = new Options(
      'cdOpts', [0, 0], [2, 0],
      [[
        new Opt(
          this.x + this.w * 0.05, this.y + this.h * 0.7, this.w * 0.3, this.h * 0.25,
          () => console.log('start'),
          'continue', 0.01, undefined, undefined, 'rgba(0, 150, 0, 0.5)'
        )
      ], [
        new Opt(
          this.x + this.w * 0.4, this.y + this.h * 0.7, this.w * 0.25, this.h * 0.25,
          () => {
            newOptions.freeze()
            createConfirmDelete(game, this.fileKey, newOptions)
          },
          'delete', 0.01, undefined, undefined, 'rgba(150, 0, 0, 0.5)'
        )
      ], [
        new Opt(
          this.x + this.w * 0.7, this.y + this.h * 0.7, this.w * 0.25, this.h * 0.25,
          () => {
            game.removeComponents('cdOpts')
            opts.freeze()
          },
          'back', 0.01, undefined, undefined, 'rgba(50, 50, 50, 0.5)'
        )
      ]]
    )
    game.addComponents(newOptions)
  }
}

module.exports = SavedGame