const fs = require('fs')
const { resolve } = require('path')
const constants = require('../util/constants')

exports.getSfxManager = async game => {
  const sfxFiles = await new Promise((resolve, reject) => {
    fs.readdir(constants.sfxLocation, {}, (err, files) => {
      err && (console.error(err), reject(err))
      resolve(files)
    })
  })
  const sfxManager = {}
  await Promise.all(sfxFiles.map(async file => {
    let key = file.substr(0, file.lastIndexOf('.'))
    let audio = new Audio(`${constants.sfxLocation}/${file}`)
    sfxManager[key] = audio
    audio.preload = ''
    audio.addEventListener('loadeddata', () => {
      resolve()
    })
  }))
  game.getSfx = () => sfxManager
  game.playSfx = key => {
    sfxManager[key] && (
      sfxManager[key].currentTime = 0,
      sfxManager[key].play()
    )
  }
  game.setSfxVolume = newVol => {
    for (let key in sfxManager) {
      sfxManager[key].volume = newVol
    }
  }
}
