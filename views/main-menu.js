const values = require('../src/values')
const Window = require('../models/window')
const Options = require('../models/options')
const Opt = require('../models/opt')

module.exports = () => {
  let options
  let cbs = [
    () => console.log('Game Start!'),
    (opts) => {
      opts.freeze()
      setTimeout(opts.freeze, 2000)
    },
    () => window.close()
  ]
  options = new Options(
    'mo', [0, 0], [0, 10],
    [
      ['start', 'options', 'quit'].map((txt, i) => new Opt(
        0.425,
        0.4 + 0.07 * i,
        0.15,
        0.07,
        () => cbs[i](options),
        txt,
        0.01
      ))
    ])
  return [
    new Window('bmm', 0.4, 0.3, 0.2, 0.4, '#707070'),
    options
  ]
}
