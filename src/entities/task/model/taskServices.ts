import { AddTaskArgs } from "@doist/todoist-api-typescript"
import { todoistApi } from "@shared/config/todoist"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ITaskFilter, IUpdateTask } from "./taskServices.d"
import { convertFilterToQuery } from "../lib/taskHelpers"

export const useTasks = ({ filter, projectId }: ITaskFilter) => {
  return useQuery({
    queryKey: ['tasks', filter, projectId],
    queryFn: () => todoistApi.getTasks(convertFilterToQuery(filter, projectId)),
    staleTime: 1000 * 60 * 5,
  })
}

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (task: AddTaskArgs) => todoistApi.addTask(task),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
  })
}

export const useCompleteTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => todoistApi.closeTask(id),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({id, data}: IUpdateTask) => todoistApi.updateTask(id, data),
    onMutate: async (newTask) => {
      // Отменяем исходящие запросы, чтобы они не перезаписали наши оптимистичные обновления
      await queryClient.cancelQueries({ queryKey: ['tasks'] })
      
      // Сохраняем предыдущее состояние
      const previousTasks = queryClient.getQueryData(['tasks'])
      
      // Оптимистично обновляем кэш
      queryClient.setQueryData(['tasks'], (old: any) => {
        if (!old?.results) return old
        
        return {
          ...old,
          results: old.results.map((task: any) => 
            task.id === newTask.id 
              ? { ...task, due: { ...task.due, date: newTask.data.dueString } } 
              : task
          )
        }
      })
      
      // Возвращаем предыдущее состояние для отката в случае ошибки
      return { previousTasks }
    },
    onError: (err, newTask, context) => {
      // В случае ошибки откатываем изменения
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks)
      }
    },
    onSettled: () => {
      // В любом случае инвалидируем запрос, чтобы получить актуальные данные
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => todoistApi.deleteTask(id),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  })
}