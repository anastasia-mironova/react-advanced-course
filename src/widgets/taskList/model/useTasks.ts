import type {Task} from 'entities/task'
import {useCallback, useEffect, useMemo, useState} from 'react'
import type {FilterType} from 'shared/filter'
import {useGetTasksQuery} from 'widgets/taskList/api/tasksApi.ts'

export default function useTasks() {
  const {data: remoteTasks = [], isLoading} = useGetTasksQuery()
  const [tasks, setTasks] = useState<Task[]>(remoteTasks)
  const [filter, setFilter] = useState<FilterType>('all')

  useEffect(() => {
    if (remoteTasks.length > 0 && tasks.length === 0) {
      setTasks(remoteTasks)
    }
  }, [remoteTasks, tasks.length])

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
    removeTask,
    isLoading
  }
}
