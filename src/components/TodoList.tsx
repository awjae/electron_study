import React, { useState } from 'react'
import styles from '../styles/common.module.css'

function TodoList({ list }: { list: TodoType[] }) {
  return (
    <ul>
      {list.map((item) => (
        <li className={styles.todoItem}>{item.contents}</li>
      ))}
    </ul>
  )
}

export default TodoList
