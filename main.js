const { app, BrowserWindow, protocol } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

const createWindow = () => {
  const WEB_FOLDER = 'web'
  const PROTOCOL = 'file'

  protocol.interceptFileProtocol(PROTOCOL, (request, callback) => {
    // // Strip protocol
    let url = request.url.substr(PROTOCOL.length + 1)

    // Build complete path for node require function
    url = path.join(__dirname, WEB_FOLDER, url)

    // Replace backslashes by forward slashes (windows)
    // url = url.replace(/\\/g, '/');
    url = path.normalize(url)

    console.log(url)
    callback({ path: url })
  })

  const win = new BrowserWindow({
    width: 640,
    height: 480,
    // frame: true,
    // transparent: true,
    // backgroundColor: 'rgba(0, 0, 0, .8)',
    // webPreferences: { preload: path.join(__dirname, 'preload.js') },
    nodeIntegration: true,
    contextIsolation: false,
  })

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  // win.loadFile('index.html');
  // win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
  mainWindow.loadURL(
    url.format({
      pathname: 'index.html',
      protocol: PROTOCOL + ':',
      slashes: true,
    }),
  )
  win.loadFile('./build/index.html')
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
