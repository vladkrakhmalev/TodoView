import { Task } from '@doist/todoist-api-typescript';

export interface ITaskForm {
  content: string
  date?: string
  timeStart?: string
  timeEnd?: string
}

export interface IDayWithTasks {
  noTime: Task[]
  [key: string]: Task[]
}

export interface IWeekdayWithTasks {
  noDate: Task[]
  // 7 дней недели
  days: [IDayWithTasks, IDayWithTasks, IDayWithTasks, IDayWithTasks, IDayWithTasks, IDayWithTasks, IDayWithTasks]
}