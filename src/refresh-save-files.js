const fs = require('fs')
const { saveFileLocation } = require('../util/constants')

exports.refreshSaveFiles = async (game) => {
  let files = await new Promise((resolve, reject) => {
    fs.readdir(saveFileLocation, {}, (err, files) => {
      err && (console.error(err), reject(err))
      resolve(files)
    })
  })
  let quicksave
  let saveFiles = files.filter(file => (
    (file === 'quicksave') && (quicksave = file),
    file.startsWith('sav_') && +file.substr(4) === +file.substr(4)
  )).sort((file1, file2) => file1.substr(4) - file2.substr(4))
  game.saves.quicksave = quicksave
  game.saves.list = await Promise.all(saveFiles.map(fileName => new Promise((resolve, reject) => {
    fs.readFile(`${saveFileLocation}/${fileName}/meta`, {}, (err, data) => {
      err && (console.error(err), reject(err))
      resolve({
        ...JSON.parse(data.toString()),
        folder: `${saveFileLocation}/${fileName}/`
      })
    })
  })))
}
