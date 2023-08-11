import React, { useState } from 'react'
import styles from '../styles/common.module.css'
import List from '../_designSystem/List'
import ListItem from '../_designSystem/ListItem'

function TodoList({ list, handleChange }: { list: TodoType[]; handleChange: Function }) {
  return (
    // <ul>
    //   {list.map((item) => (
    //     <li className={styles.todoItem}>{item.contents}</li>
    //   ))}
    // </ul>
    <List>
      {list.map((item, idx) => (
        <ListItem key={idx} className={styles.todoItem}>
          <span>{item.contents}</span>
          <input type="checkbox" onChange={(e) => handleChange(e, item)} />
        </ListItem>
      ))}
    </List>
  )
}

export default TodoList
