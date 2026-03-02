import React from 'react'
import type {Task} from 'entities/task/model/types'
import styles from './TaskCard.module.css'

export const TaskCard: React.FC<Task> = React.memo<Task>(({title, completed}) => (
  <div>
    <div className={`${styles.card} ${completed ? styles.completed : ''}`}>
      <span className={styles.title}>{title}</span>
      <div className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={completed}
          readOnly
          id={`task-${title}`}
        />
        <label htmlFor={`task-${title}`} className={styles.checkboxLabel} />
      </div>
    </div>
  </div>
))
