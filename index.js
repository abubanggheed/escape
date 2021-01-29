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
  return win
}

app.whenReady().then(() => {
  values.window = createWindow()
})

app.on('window-all-closed', () => {
  process.platform !== 'darwin' && app.quit()
})

app.on('activate', () => {
  !BrowserWindow.getAllWindows().length && (values.window = createWindow())
})
