import {baseApi} from 'shared/api/baseApi'
import type {Task} from 'entities/task'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<Task[], void>({
      query: () => 'todos',
      transformResponse: (resp: Task[]) => resp,
      providesTags: ['Tasks']
    })
  }),
  overrideExisting: false
})

export const {useGetTasksQuery} = tasksApi
