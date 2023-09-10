import React, { useEffect, useState } from 'react'
import styles from '../styles/common.module.css'
import List from '../_designSystem/List'
import ListItem from '../_designSystem/ListItem'
import classNames from 'classnames'

function TodoList({ list, handleChange }: { list: TodoType[]; handleChange: Function }) {
  useEffect(() => {
    console.log(list)
  }, [list])

  return (
    // <ul>
    //   {list.map((item) => (
    //     <li className={styles.todoItem}>{item.contents}</li>
    //   ))}
    // </ul>
    <List>
      {list.map((item, idx) => (
        <ListItem key={idx} className={classNames([styles.todoItem, styles[item.state]])}>
          <span>{item.contents}</span>
          <input type="checkbox" onChange={(e) => handleChange(e, item)} checked={item.state === 'done'} />
          {item.state === 'done' && <button className={styles.todoItemDelBtn}>삭제</button>}
        </ListItem>
      ))}
    </List>
  )
}

export default TodoList
