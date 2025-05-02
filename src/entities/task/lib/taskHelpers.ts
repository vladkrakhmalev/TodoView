import { Task, AddTaskArgs } from "@doist/todoist-api-typescript";
import { getDueString, getDuration, getTimeByDuration, getTimeByString } from "@shared/lib/time"
import dayjs from "@shared/config/dayjs";
import { IDayWithTasks, ITaskForm, IWeekdayWithTasks } from "../model/task"
import { IUpdateTask, ITaskFilter } from "../model/taskServices.d";
import { TIMES_WITH_HALF } from "@shared/config/calendar";

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

export const convertTaskToForm = (task: Task): ITaskForm => {
  const { content, due, duration } = task

  return {
    content,
    date: due?.date || '',
    timeStart: getTimeByString(due?.datetime),
    timeEnd: getTimeByDuration(due?.datetime, duration?.amount),
  }
}

export const convertDndToTask = (taskId: number | string, activeDroppableId: string): IUpdateTask => {
  const [date, time] = activeDroppableId.split('_')
  const dueString = getDueString(date, time)
  
  return {
    id: String(taskId),
    data: { dueString },
  }
}

export const convertResizeToTask = (duration: number, task: Task): IUpdateTask => {

  return {
    id: task.id,
    data: {
      ...task,
      duration: duration,
      durationUnit: 'minute',
    }
  }
}

const createEmptyDay = () =>
  TIMES_WITH_HALF.reduce<IDayWithTasks>(
    (acc, time) => ({ ...acc, [time]: [], noTime: [] }),
    { noTime: [] }
  )

export const getWeekdaysWithTasks = (tasks: Task[] = []): IWeekdayWithTasks => {
  const weekdays: IWeekdayWithTasks = {
    noDate: [],
    days: [
      createEmptyDay(), // Пн
      createEmptyDay(), // Вт
      createEmptyDay(), // Ср
      createEmptyDay(), // Чт
      createEmptyDay(), // Пт
      createEmptyDay(), // Сб
      createEmptyDay(), // Вс
    ]
  }

  tasks.forEach(task => {
    if (task.due?.date) {
      const day = Number(dayjs(task.due.datetime).format('d'))
      const adjustedDay = day === 0 ? 6 : day - 1 // Воскресенье становится последним днем

      if (task.due?.datetime) {
        const time = dayjs(task.due.datetime).format('HH:mm')
        weekdays.days[adjustedDay][time].push(task)
      } else weekdays.days[adjustedDay].noTime.push(task)
    } else weekdays.noDate.push(task)
  })

  return weekdays
}

export const convertFilterToQuery = (filter?: string, projectId?: string) => {
  const query: ITaskFilter = {}
  if (filter) query.filter = filter
  if (projectId) query.projectId = projectId
  return query
}
