import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type TodoType = {
    id: string,
    userId: number,
    title: string,
    competed: boolean
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3700'}),
    tagTypes: ['todos'],
    endpoints: builder => ({
        getTodos: builder.query({
            query: () => '/todos',
            // transformResponse: (res: TodoType[]) => res.sort((a, b) => Number(b.id )- Number(a.id)),
            transformResponse: (res: TodoType[]) => res.sort(() => -1),
            providesTags: ['todos']
        }),
        addTodo: builder.mutation({ // we use mutation becouse we change data not just queryung or fetch data
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['todos'] // mean if you mutate then refetch the cached data todos
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['todos']
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['todos']
        }),
    })
})

export const { 
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = apiSlice;