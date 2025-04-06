import { AddTaskArgs } from "@doist/todoist-api-typescript"
import { todoistApi } from "@shared/config/todoist"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useTasks = (filter?: string) => {
  return useQuery({
    queryKey: ['tasks', filter],
    queryFn: () => todoistApi.getTasks({ filter }),
    staleTime: 1000 * 60 * 5,
  })
}

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (task: AddTaskArgs) => todoistApi.addTask(task),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
  })
}

export const useCompleteTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => todoistApi.closeTask(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  })
}