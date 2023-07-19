import React from 'react'
import closeIcon from '../assets/cross-mark.png'
import styles from '../styles/common.module.css'

function Main() {
  const close = () => {
    window.electron.ipcRenderer.send('close')
  }

  return (
    <div>
      <div className={styles.closeBtn} onClick={close}>
        <img src={closeIcon} alt="" width={32} height={32} />
      </div>
      <header>헤더지롱</header>
      <main>메인이지롱</main>
    </div>
  )
}

export default Main
