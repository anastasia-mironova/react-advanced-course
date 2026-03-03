import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com'
  }),
  tagTypes: ['Tasks'],
  endpoints: () => ({})
})
