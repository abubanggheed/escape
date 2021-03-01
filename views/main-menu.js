const Window = require('../models/window')
const Options = require('../models/options')
const Opt = require('../models/opt')
const StaticText = require('../models/static-text')

const makeMainMenu = game => {
  let options
  let cbs = [
    () => game.saves.list.length ? (
      game.removeComponents('mo', 'mmb'),
      require('./saves-screen')(game, makeMainMenu)
    ) : console.log(game.saves, 'Game Start!'),
    opts => {
      opts.freeze()
      setTimeout(opts.freeze, 2000)
    },
    opts => {
      opts.freeze()
      game.addComponents(
        Window.text('cqmw'),
        new StaticText('cqm', 0.01, 0.85, 0.99, 0.04, 'Exit Escape Darkness?'),
        Window.textOpts('cqcw'),
        new Options('cqc', [0, 1], [0, 1], [[
          new Opt(
            0.9, 0.66, 0.1, 0.07,
            () => window.close(),
            'Quit', 0.01
          ),
          new Opt(
            0.9, 0.73, 0.1, 0.07,
            () => {
              game.removeComponents('cqmw', 'cqm', 'cqcw', 'cqc'),
                opts.freeze()
            }, 'Back', 0.01
          )
        ]])
      )
    }
  ]
  options = new Options(
    'mo', [0, 0], [0, 10],
    [
      ['start', 'options', 'quit'].map((txt, i) => new Opt(
        0.425, 0.4 + 0.07 * i, 0.15, 0.07, () => cbs[i](options), txt, 0.01
      ))
    ])
  game.addComponents(
    new Window('mmb', 0.4, 0.3, 0.2, 0.4, [80, 80, 80, 1], [80, 80, 80, 0.5]),
    options
  )
}

module.exports = makeMainMenu
