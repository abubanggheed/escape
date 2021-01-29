const Command = require('../models/command')

const bindings = {
}

const commands = {
  up: new Command('up arrow', 'Move Up', 'ArrowUp'),
  down: new Command('down arrow', 'Move Down', 'ArrowDown'),
  left: new Command('left arrow', 'Move Left', 'ArrowLeft'),
  right: new Command('right arrow', 'Move Right', 'ArrowRight'),
  shift: new Command('shift', 'Run', 'Shift'),
  lookU: new Command('i', 'Look Up', 'I'),
  lookD: new Command('d', 'Look Down', 'D'),
  lookR: new Command('l', 'Look Right', 'L'),
  lookL: new Command('j', 'Look Left', 'J'),
  ok: new Command('x', 'Okay', 'X'),
  back: new Command('z', 'Back', 'Z'),
  menu: new Command('m', 'Menu', 'M'),
  pageRight: new Command('w', 'Page Right', 'W'),
  pageLeft: new Command('q', 'Page Left', 'Q'),
  ambush: new Command('a', 'Ambush', 'A'),
  jump: new Command('spacebar', 'Jump', 'Space'),
  time: new Command('t', 'Show/Hide Time', 'T'),
}

for (key in commands) {
  bindings[commands[key].binding] = key
}

const keyHandler = state => event => {
  if (bindings[event.key]) commands[bindings[event.key]].active = state
}

document.addEventListener('keydown', keyHandler(true), false)
document.addEventListener('keyup', keyHandler(false), false)

module.exports = {
  commands,
  bindings
}
