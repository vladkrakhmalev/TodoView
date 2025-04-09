import { UpdateTaskArgs } from "@doist/todoist-api-typescript"

export interface IUpdateTask {
  id: string
  data: UpdateTaskArgs
}