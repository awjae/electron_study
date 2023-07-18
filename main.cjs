const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const url = require('url')

const createWindow = () => {
  const WEB_FOLDER = 'web'
  const PROTOCOL = 'file'

  const win = new BrowserWindow({
    width: 640,
    height: 480,
    // frame: true,
    // transparent: true,
    // backgroundColor: 'rgba(0, 0, 0, .8)',
    // webPreferences: { preload: path.join(__dirname, 'preload.js') },
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isDev) {
    win.webContents.openDevTools()
  }

  const startUrl = url.format({
    pathname: path.join(__dirname, '/build/index.html'),
    protocol: 'file:',
    slashes: true,
  })
  win.loadURL(startUrl)

  console.log(win.webContents.getURL())

  // win.loadFile('index.html');
  // win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
  // win.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, '/../build/index.html'),
  //     protocol: PROTOCOL + ':',
  //     slashes: true,
  //   }),
  // )
  // win.loadFile('./build/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
