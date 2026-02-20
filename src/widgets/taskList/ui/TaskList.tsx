import React from 'react'
import useTasks from '../model/useTasks'
import {TaskCard} from 'entities/task/ui/TaskCard'
import styles from './TaskList.module.css'
import type {Task} from 'entities/task'
import type {FilterType} from 'widgets/taskList/model/types'
import {FilterButtons} from 'shared/filter/ui/FilterButtons.tsx'

const initialTasks: Task[] = [
  {id: '1', title: 'Купить продукты', completed: false},
  {id: '2', title: 'Постирать вещи', completed: true},
  {id: '3', title: 'Погладить кошку', completed: false},
  {id: '4', title: 'Написать код', completed: true},
  {id: '5', title: 'Выпить чай', completed: false}
]

export const TaskList: React.FC = () => {
  const {tasks, filter, setFilter, removeTask} = useTasks(initialTasks)

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter)
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
