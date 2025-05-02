import { todoistApi } from "@shared/config/todoist"
import { useQuery } from "@tanstack/react-query"

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => todoistApi.getProjects(),
    staleTime: 1000 * 60 * 15, // 15 минут
  })
} 