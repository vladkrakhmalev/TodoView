import { TodoistApi } from "@doist/todoist-api-typescript"

const accessToken = localStorage.getItem('accessToken') || ''

export const todoistApi = new TodoistApi(accessToken)