const { app, BrowserWindow } = require('electron')
const values = require('./src/values')

const createWindow = () => {
  const win = new BrowserWindow({
    width: values.windowWidth,
    height: values.windowHeight,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('index.html')
  win.autoHideMenuBar = true
  // win.setResizable(false)
  return win
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  !BrowserWindow.getAllWindows().length && (createWindow())
})
