import { AddTaskArgs } from "@doist/todoist-api-typescript"
import { ITaskForm } from "../model/task"
import { MouseEvent } from "react"
import { IDimensions } from "@shared/types"
import { ITask } from "@entities/task"
import { convertTime } from "@shared/lib/converters"

export const convertFormToTask = ({ date, time, ...rest }: ITaskForm): AddTaskArgs => {
  const task = { due_string: '', ...rest, }
  if (date) task.due_string += date
  if (time) task.due_string += ` в ${time}`
  return task
}

export const convertTaskToForm = (task: ITask): ITaskForm => {
  const { content, due } = task
  const date = due?.date || ''
  const time = due?.datetime ? convertTime(due.datetime) : ''
  return { content, date, time }
}

export const getTopByСoordinates = (event: MouseEvent<HTMLDivElement>, dimensions: IDimensions): number => {
  return (Math.floor((event.nativeEvent.offsetY) / dimensions.height * 2) / 2) * dimensions.height
}

export const getTimeByСoordinates = (event: MouseEvent<HTMLDivElement>, dimensions: IDimensions): string => {
  const coef = Math.floor((event.nativeEvent.offsetY) / dimensions.height * 2) / 2
  const hours = Math.floor(coef)
  const minutes = Math.round((coef - hours) * 60)
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}