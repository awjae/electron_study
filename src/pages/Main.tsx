import React, { useEffect, useState } from 'react'
import closeIcon from '../assets/cross-mark.png'
import styles from '../styles/common.module.css'
import TodoList from '../components/TodoList'
import { useMutation, gql, useQuery } from '@apollo/client'

const getHello = gql`
  query {
    hello
  }
`

function Main() {
  const { loading, error, data } = useQuery(getHello)
  const [todoList, setTodoList] = useState<TodoType[]>([{ contents: '123' }])

  const close = () => {
    window.electron.ipcRenderer.send('close')
  }

  const handleChangeBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
    window.electron.ipcRenderer.send('handleAlwaysOnTop', e.target.checked)
  }

  useEffect(() => {
    console.log(loading, error, data)
  }, [data, loading, error])

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.alwaysOnTopCheckBtn}>
          <input id="alwaysOnTopInput" type="checkbox" onChange={handleChangeBtn} />
          <label htmlFor="alwaysOnTopInput">항상 위</label>
        </div>
        <div className={styles.closeBtn} onClick={close}>
          <img src={closeIcon} alt="" width={24} height={24} />
        </div>
      </header>
      <TodoList list={todoList}></TodoList>
    </div>
  )
}

export default Main
