import { MouseEvent } from "react"
import { Task, AddTaskArgs } from "@doist/todoist-api-typescript";
import { DragEndEvent } from "@dnd-kit/core"
import { getDueString, getDuration, getTimeByDuration, getTimeByString } from "@shared/lib/time"
import dayjs from "@shared/config/dayjs";
import { ITaskForm, ITask } from "../model/task"
import { IUpdateTask } from "../model/taskServices.d";
import { Dayjs } from "dayjs";

export const convertFormToTask = (form: ITaskForm): AddTaskArgs => {
  const { date, timeStart, timeEnd, ...rest } = form

  if (timeEnd) {
    return {
      dueString: getDueString(date, timeStart),
      duration: getDuration(timeStart, timeEnd),
      durationUnit: 'minute',
      ...rest
    }
  }

  return {
    dueString: getDueString(date, timeStart),
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

// TODO Вынести расчеты в shared/lib

export const convertDndToTask = (event: DragEndEvent, taskHeight: number): IUpdateTask => {
  const coef = Math.floor((event.delta.y) / taskHeight * 2) / 2
  const newTime = dayjs(event.active.data.current?.due.datetime).add(coef * 60, "minute").format('HH:mm')
  const dueString = getDueString(String(event.over?.id), newTime)

  return {
    id: String(event.active.id),
    data: { dueString },
  }
}

// TODO Вынести функции с кординатами в shared/lib

export const getTopByСoordinates = (event: MouseEvent<HTMLDivElement>, taskHeight: number): number => {
  return (Math.floor((event.nativeEvent.offsetY) / taskHeight * 2) / 2) * taskHeight
}

export const getDateByСoordinates = (event: MouseEvent<HTMLDivElement>, taskHeight: number): Dayjs => {
  const coef = Math.floor((event.nativeEvent.offsetY) / taskHeight * 2) / 2;
  const time = dayjs().startOf('day').add(coef, 'hour');
  return time
}

// TODO Вынести из функции то, что связано с кординатами в shared/lib

export const convertAndGroupTasks = (tasks: Task[], height: number, width: number): ITask[][] => {
  const daysOfWeek: ITask[][] = [[], [], [], [], [], [], []]

  tasks.forEach(task => {
    if (task.due?.datetime) {
      const date = dayjs(task.due.datetime)
      const day = Number(date.format('d'))
      const adjustedDay = day === 0 ? 6 : day - 1;  // Воскресенье становится последним днем
      const taskTop = (date.hour() + date.minute() / 60) * height;
      const taskHeight = (task.duration?.amount || 30) / 30 * height / 2;

      daysOfWeek[adjustedDay].push({
        ...task,
        _top: taskTop,
        _height: taskHeight,
        _width: width - 2,
      })
    }
  })

  return daysOfWeek
}