import { FC, ReactNode } from 'react'
import './TaskCalendarCard.css'
import { Task } from '@doist/todoist-api-typescript'
import { CELL_HEIGHT } from '@shared/config/calendar'
import { getTimeDiapason } from '@shared/lib/time'

interface IProps {
  task: Task
  completeTask?: ReactNode
  draggableTask?: ReactNode
  resizeTask?: ReactNode
}

export const TaskCalendarCard: FC<IProps> = ({
  task,
  completeTask,
  draggableTask,
  resizeTask,
}) => {
  const style = {
    height: ((task.duration?.amount || 30) / 30) * CELL_HEIGHT - 4 + 'px',
  }
  const timeDiapason = getTimeDiapason(
    task.due?.datetime,
    task.duration?.amount
  )

  return (
    <div data-task-id={task.id} className='task-calendar-card' style={style}>
      <div className='task-calendar-card__head'>
        <div className='task-calendar-card__complete'>{completeTask}</div>

        <span className='task-calendar-card__title'>{task.content}</span>

        <span className='task-calendar-card__subtitle'>{timeDiapason}</span>

        <div className='task-calendar-card__draggable'>{draggableTask}</div>
      </div>

      {resizeTask}
    </div>
  )
}
