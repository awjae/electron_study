// preload.js
const { contextBridge, ipcRenderer, ipcMain } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: ipcRenderer,
})

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
