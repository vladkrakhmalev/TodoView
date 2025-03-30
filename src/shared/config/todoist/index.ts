import { TodoistApi } from "@doist/todoist-api-typescript"

const TODOIST_KEY = import.meta.env.VITE_TODOIST_KEY

export const todoistApi = new TodoistApi(TODOIST_KEY)