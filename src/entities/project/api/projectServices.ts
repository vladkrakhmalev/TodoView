import { todoistApi } from "@shared/config/todoist"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { IProjectForm } from "../model/project.types"
import { IUpdateProjectArgs } from "./projectServices.types"

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => todoistApi.getProjects(),
    staleTime: 1000 * 60 * 15,
  })
} 

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => todoistApi.getProject(id),
    staleTime: 1000 * 60 * 15,
  })
}

export const useAddProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (project: IProjectForm) => todoistApi.addProject(project),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['projects'] })
  })
}

export const useUpdateProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: IUpdateProjectArgs) => todoistApi.updateProject(id, data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => todoistApi.deleteProject(id),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['projects'] })
  })
}