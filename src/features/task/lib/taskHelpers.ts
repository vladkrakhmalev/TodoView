import { AddTaskArgs } from "@doist/todoist-api-typescript"
import { ITaskForm } from "../model/task"
import { MouseEvent } from "react"
import { IDimensions } from "@shared/types"
import { ITask } from "@entities/task"
import { getDueString, getDuration, getTimeByDuration, getTimeByString } from "@shared/lib/time"

export const convertFormToTask = (form: ITaskForm): AddTaskArgs => {
  const { date, timeStart, timeEnd, ...rest } = form

  return {
    dueString: getDueString(date, timeStart),
    duration: getDuration(timeStart, timeEnd),
    durationUnit: 'minute',
    ...rest
  }
}

export const convertTaskToForm = (task: ITask): ITaskForm => {
  const { content, due, duration } = task

  return {
    content,
    date: due?.date || '',
    timeStart: getTimeByString(due?.datetime),
    timeEnd: getTimeByDuration(due?.datetime, duration?.amount),
  }
}

// TODO Вынести функции с кординатами в shared/lib

export const getTopByСoordinates = (event: MouseEvent<HTMLDivElement>, dimensions: IDimensions): number => {
  return (Math.floor((event.nativeEvent.offsetY) / dimensions.height * 2) / 2) * dimensions.height
}

export const getTimeByСoordinates = (event: MouseEvent<HTMLDivElement>, dimensions: IDimensions): string => {
  const coef = Math.floor((event.nativeEvent.offsetY) / dimensions.height * 2) / 2
  const hours = Math.floor(coef)
  const minutes = Math.round((coef - hours) * 60)
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}