import type {Task} from 'entities/task'
import {useCallback, useMemo, useState} from 'react'
import type {FilterType} from 'shared/filter'

export default function useTasks(initial: Task[]) {
  const [tasks, setTasks] = useState<Task[]>(initial)
  const [filter, setFilter] = useState<FilterType>('all')

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed)
      case 'incomplete':
        return tasks.filter((task) => !task.completed)
      case 'all':
      default:
        return tasks
    }
  }, [tasks, filter])

  const removeTask = useCallback((id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }, [])

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    removeTask
  }
}
