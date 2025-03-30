import dayjs from "@shared/config/dayjs";
import { Task } from "@doist/todoist-api-typescript";
import { ITask } from "./task";
import { IDimensions } from "@shared/types";

export const convertAndGroupTasks = (tasks: Task[], dimensions: IDimensions): ITask[][] => {
  const daysOfWeek: ITask[][] = [[], [], [], [], [], [], []]

  tasks.forEach(task => {
    if (task.due?.datetime) {
      const date = dayjs(task.due.datetime)
      const day = Number(date.format('d'))
      const adjustedDay = day === 0 ? 6 : day - 1;  // Воскресенье становится последним днем
      const taskTop = (date.hour() + date.minute() / 60) * dimensions.height;

      daysOfWeek[adjustedDay].push({ ...task, _top: taskTop, _width: dimensions.width - 2 })
    }
  })

  return daysOfWeek
}