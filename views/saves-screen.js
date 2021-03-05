const Opt = require('../models/opt')
const ScrollingOptions = require('../models/scrolling-options')
const StaticText = require('../models/static-text')
const SavedGame = require('../models/saved-game')
const { refreshSaveFiles } = require('../src/set-up')

const makeSavesScreen = (game, onBack) => {
  let savesOptions = new ScrollingOptions('loadScreen', [1, 1], [0, 0], [[
    new Opt(0.09, 0.05, 0.17, 0.08, () => {
      game.removeComponents('loadScreen')
      onBack(game)
    }, 'back', 0.01)
  ], [
    new Opt(0.3, 0.05, 0.4, 0.2, () => console.log('Game Start!'),
      new StaticText('ngm', 0.42, 0.18, 0.17, 0.1, 'New Game'), 0.01),
    ...game.saves.list.map((sav, i) => {
      let sg = new SavedGame(0.3, 0.25 + 0.2 * i, 0.4, 0.2, sav.name, sav.folder,
        () => {
          savesOptions.freeze()
          sg.spawnOpts(game, savesOptions)
        }, () => {
          refreshSaveFiles(game).then(() => {
            game.removeComponents('loadScreen')
            makeSavesScreen(game, onBack)
            game.ctx.ui.tr()
            game.ctx.uian.tr()
            !game.saves.list.length && (
              game.removeComponents('loadScreen', onBack(game))
            )
            game.render()
          })
        }, '', 0.01)
      return sg
    })
  ]], 0, 1)
  game.addComponents(
    savesOptions
  )
}

module.exports = makeSavesScreen
