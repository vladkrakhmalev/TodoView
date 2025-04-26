import { TodoistApi } from "@doist/todoist-api-typescript"

const TODOIST_KEY = localStorage.getItem('todoist_key') || ''

export const todoistApi = new TodoistApi(TODOIST_KEY)