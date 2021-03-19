const EventChain = require('../models/events/event-chain')
const Speech = require('../models/events/speech')

const newGame = game => {
  const d1 = new Speech('jsdh kdf asjdkjh fkashj kjdsah ksdjah kasdhaf ksjh fkjas hafksj hadksj hfkasj hafksj hdf')
  const d2 = new Speech('kjdsh aksjh kasjh ksj hfkasj haksjd haksj hfaksjd ahdlsk fhskj dsk aslkj ahfsld fkdjsh')
  const beginingDialogue = new EventChain('newGameSetup', [d1, d2])
  game.addComponents(beginingDialogue)
}

module.exports = newGame
