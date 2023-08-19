import React, { useEffect, useState } from 'react'
import closeIcon from '../assets/cross-mark.png'
import styles from '../styles/common.module.css'
import TodoList from '../components/TodoList'
import { useMutation, useQuery } from '@apollo/client'
import { getTodoList, patchTodo, postTodoList } from '../gql/todoAPI'
import { appClose, handleAlwaysOnTop } from '../utils/electron'

function Main() {
  const { loading, error, data } = useQuery(getTodoList)
  const [todoList, setTodoList] = useState<TodoType[]>([{ contents: '123' }])
  const [createTodoList] = useMutation(postTodoList)
  const [updateTodo] = useMutation(patchTodo)

  const close = () => {
    appClose()
  }

  const add = () => {
    createTodoList({ variables: { contents: 'test' } })
  }

  const handleChangeBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleAlwaysOnTop(e.target.checked)
  }

  const handleChangeReadyOrDone = (e: React.ChangeEvent<HTMLInputElement>, item: TodoType) => {
    setTodoList((prevState) =>
      prevState.map((todo) => {
        if (todo.no === item.no) {
          return { ...todo, state: e.target.checked ? 'done' : 'ready' }
        }
        return todo
      }),
    )

    e.target.checked
      ? updateTodo({ variables: { no: item.no, state: 'done' } })
      : updateTodo({ variables: { no: item.no, state: 'ready' } })
  }

  useEffect(() => {
    if (!loading) {
      setTodoList(data.getTodoList)
    }
  }, [data, loading, error])

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.alwaysOnTopCheckBtn}>
          <input id="alwaysOnTopInput" type="checkbox" onChange={handleChangeBtn} />
          <label htmlFor="alwaysOnTopInput">항상 위</label>
        </div>
        <button className={styles.closeBtn} onClick={close}>
          <img src={closeIcon} alt="" width={24} height={24} />
        </button>
      </header>
      <TodoList list={todoList} handleChange={handleChangeReadyOrDone}></TodoList>
      <footer>
        <button className={styles.addBtn} onClick={add}>
          +
        </button>
      </footer>
    </div>
  )
}

export default Main
