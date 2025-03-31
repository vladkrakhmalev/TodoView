import { AddTaskArgs } from "@doist/todoist-api-typescript"
import { IAddTaskForm } from "./addTask"
import { MouseEvent } from "react"
import { IDimensions } from "@shared/types"

export const convertForm = ({ date, time, ...rest }: IAddTaskForm): AddTaskArgs => {
  const newTask = { due_string: '', ...rest, }

  if (date) newTask.due_string += date
  if (time) newTask.due_string += ` в ${time}`

  return newTask
}

export const getTopByСoordinates = (event: MouseEvent<HTMLDivElement>, parrentTop: number, dimensions: IDimensions): number => {
  return (Math.floor((event.pageY - parrentTop) / dimensions.height * 2) / 2) * dimensions.height
}

export const getTimeByСoordinates = (event: MouseEvent<HTMLDivElement>, parrentTop: number, dimensions: IDimensions): string => {
  const coef = Math.floor((event.pageY - parrentTop) / dimensions.height * 2) / 2
  const hours = Math.floor(coef)
  const minutes = Math.round((coef - hours) * 60)
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}