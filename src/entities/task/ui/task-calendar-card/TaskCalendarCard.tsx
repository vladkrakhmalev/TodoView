import { FC, ReactNode, useMemo } from 'react';
import './TaskCalendarCard.css'
import { Task } from '@doist/todoist-api-typescript';
import { CELL_HEIGHT } from '@shared/config/calendar';

interface IProps {
  task: Task
  completeTask?: ReactNode
  draggableTask?: ReactNode
  resizeTask?: ReactNode
}

export const TaskCalendarCard: FC<IProps> = ({ task, completeTask, draggableTask, resizeTask }) => {

  const style = useMemo(() => {
    return { height: (task.duration?.amount || 30) / 30 * CELL_HEIGHT - 4 + 'px' }
  }, [task])

  return (
    <div data-task-id={task.id} className='task-calendar-card' style={style}>
      { completeTask }
      { task.content }

      <div className="task-calendar-card__draggable">
        { draggableTask }
      </div>

      { resizeTask }
    </div>
  );
};
