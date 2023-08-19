export const handleAlwaysOnTop = (checked: boolean) => {
  window.electron.ipcRenderer.send('handleAlwaysOnTop', checked)
}
export const appClose = () => {
  window.electron.ipcRenderer.send('close')
}
