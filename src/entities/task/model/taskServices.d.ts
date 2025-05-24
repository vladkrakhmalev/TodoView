import { UpdateTaskArgs } from '@doist/todoist-api-typescript'

export interface ITaskFilter {
  filter?: string
  projectId?: string
}

export interface IUpdateTask {
  id: string
  data: UpdateTaskArgs
}
