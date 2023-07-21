import React from 'react'
import closeIcon from '../assets/cross-mark.png'
import styles from '../styles/common.module.css'

function Main() {
  const close = () => {
    window.electron.ipcRenderer.send('close')
  }

  const handleChangeBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
    window.electron.ipcRenderer.send('handleAlwaysOnTop', e.target.checked)
  }

  return (
    <div>
      <header>
        <div className={styles.alwaysOnTopCheckBtn}>
          <input id="alwaysOnTopInput" type="checkbox" onChange={handleChangeBtn} />
          <label htmlFor="alwaysOnTopInput">항상 위</label>
        </div>
        <div className={styles.closeBtn} onClick={close}>
          <img src={closeIcon} alt="" width={24} height={24} />
        </div>
      </header>
      {/* <TodoList></TodoList> */}
    </div>
  )
}

export default Main
