const values = require('../src/values')
const Options = require('../models/options')
const Opt = require('../models/opt')

module.exports = () => {
  let cbs = [
    () => console.log('Game Start!'),
    () => console.log('game options'),
    () => window.close()
  ]
  return new Options(
    [0, 0],
    [0, 10],
    [
      ['start', 'options', 'quit'].map((txt, i) => new Opt(
        values.canvasWidth * 0.425,
        values.canvasHeight * 0.4 + 40 * i,
        values.canvasWidth * 0.15,
        40,
        cbs[i],
        txt,
        5
      ))
    ])
}
