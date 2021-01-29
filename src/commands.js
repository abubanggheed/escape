const Command = require('../models/command')

const bindings = {}
const cmds = {
  up: new Command('ArrowUp', 'Move Up', 'ArrowUp'),
  down: new Command('ArrowDown', 'Move Down', 'ArrowDown'),
  left: new Command('ArrowLeft', 'Move Down', 'ArrowDown'),
  right: new Command('ArrowRight', 'Move Down', 'ArrowDown'),
  shift: new Command('shift', 'Run', 'Shift'),
  lookU: new Command('i', 'Look Up', 'I'),
  lookD: new Command('d', 'Look Down', 'D'),
  lookR: new Command('l', 'Look Right', 'L'),
  lookL: new Command('j', 'Look Left', 'J'),
  jump: new Command('spacebar', 'Jump', 'Space'),
  ok: new Command('x', 'Okay', 'X'),
  back: new Command('z', 'Back', 'Z'),
  menu: new Command('m', 'Menu', 'M'),
  pageRight: new Command('w', 'Page Right', 'W'),
  pageLeft: new Command('q', 'Page Left', 'Q'),
  ambush: new Command('a', 'Ambush', 'A'),
  time: new Command('t', 'Show/Hide Time', 'T'),
  main: new Command('escape', 'esc', 'ESC')
}

for (let key in cmds) {
  bindings[cmds[key].binding] = key
}

const keyHandler = state => event => {
  let cmd = cmds[bindings[event.key]]
  if (cmd) {
    state && !cmd.active && (cmd.pressed = true)
    cmd.active = state
  }
}

const clearAllPressed = () => {
  Object.keys(cmds).forEach(key => {
    cmds[key].pressed = false
  })
}

document.addEventListener('keydown', keyHandler(true), false)
document.addEventListener('keyup', keyHandler(false), false)

module.exports = {
  cmds,
  bindings,
  clearAllPressed
}
