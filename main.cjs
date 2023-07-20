const { app, BrowserWindow, ipcMain, contextBridge, screen } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const url = require('url')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 250,
    height: 300,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.cjs'),
    },
  })

  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const windowWidth = win.getSize()[0]
  const windowHeight = win.getSize()[1]
  win.setPosition(width - windowWidth, height - windowHeight)

  const startUrl = url.format({
    pathname: path.join(__dirname, '/build/index.html'),
    protocol: 'file:',
    slashes: true,
  })
  win.loadURL(startUrl)
}

ipcMain.on('close', (event, data) => {
  app.quit()
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
