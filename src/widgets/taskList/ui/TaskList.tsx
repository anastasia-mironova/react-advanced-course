import React from 'react'
import useTasks from '../model/useTasks'
import {TaskCard} from 'entities/task'
import styles from './TaskList.module.css'
import {FilterButtons, type FilterType} from 'shared/filter'
import {Loader} from 'shared/loader'

export const TaskList: React.FC = () => {
  const {tasks, filter, setFilter, removeTask, isLoading} = useTasks()

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={styles.container}>
      <FilterButtons currentFilter={filter} onFilterChange={handleFilterChange} />
      <div className={styles.counter}>Найдено задач: {tasks.length}</div>
      <div className={styles.taskList}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className={styles.taskItem}>
              <TaskCard id={task.id} title={task.title} completed={task.completed} />
              <button
                className={styles.deleteButton}
                onClick={() => removeTask(task.id)}
                aria-label="Удалить задачу"
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <p className={styles.emptyMessage}>
            {filter === 'all'
              ? 'Задачи отсутствуют'
              : filter === 'completed'
                ? 'Нет выполненных задач'
                : 'Нет невыполненных задач'}
          </p>
        )}
      </div>
    </div>
  )
}
