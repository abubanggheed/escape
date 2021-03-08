const { refreshSaveFiles } = require('./refresh-save-files')
const { getSfxManager } = require('./sfx')

exports.setUp = async (game) => {
  await refreshSaveFiles(game)
  await getSfxManager(game)
}
