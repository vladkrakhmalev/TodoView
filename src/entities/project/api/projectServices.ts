import { todoistApi } from '@shared/config/todoist'
import { useQueryClient } from '@tanstack/react-query'
import { IProjectForm } from '../model/project.types'
import { IUpdateProjectArgs } from './projectServices.types'
import { useAuthQuery, useAuthMutation } from '@shared/config/tanstack-query'

export const useProjects = () => {
  return useAuthQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      try {
        return await todoistApi.getProjects()
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    staleTime: 1000 * 60 * 15,
  })
}

export const useProject = (id: string) => {
  return useAuthQuery({
    queryKey: ['project', id],
    queryFn: () => todoistApi.getProject(id),
    staleTime: 1000 * 60 * 15,
  })
}

export const useAddProject = () => {
  const queryClient = useQueryClient()
  return useAuthMutation({
    mutationFn: (project: IProjectForm) => todoistApi.addProject(project),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  })
}

export const useUpdateProject = () => {
  const queryClient = useQueryClient()
  return useAuthMutation({
    mutationFn: ({ id, data }: IUpdateProjectArgs) =>
      todoistApi.updateProject(id, data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient()
  return useAuthMutation({
    mutationFn: (id: string) => todoistApi.deleteProject(id),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  })
}
