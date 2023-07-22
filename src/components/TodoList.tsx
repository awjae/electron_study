import React, { useState } from 'react'
import styles from '../styles/common.module.css'
import List from '../_designSystem/List'
import ListItem from '../_designSystem/ListItem'

function TodoList({ list }: { list: TodoType[] }) {
  return (
    // <ul>
    //   {list.map((item) => (
    //     <li className={styles.todoItem}>{item.contents}</li>
    //   ))}
    // </ul>
    <List>
      {list.map((item) => (
        <ListItem className={styles.todoItem} contents={item.contents}></ListItem>
      ))}
    </List>
  )
}

export default TodoList
