const { app, BrowserWindow, ipcMain, contextBridge } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const url = require('url')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 640,
    height: 480,
    frame: false,
    transparent: true,
    backgroundColor: 'rgba(0, 0, 0, .8)',
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.cjs'),
    },
  })

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
