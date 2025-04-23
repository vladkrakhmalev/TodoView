import { FC, ReactNode, useMemo } from 'react';
import './TaskCard.css'
import { Task } from '@doist/todoist-api-typescript';
import { CELL_HEIGHT } from '@shared/config/calendar';

interface IProps {
  task: Task
  completeTask?: ReactNode
  draggableTask?: ReactNode
}

export const TaskCard: FC<IProps> = ({ task, completeTask, draggableTask }) => {

  const style = useMemo(() => {
    return { height: (task.duration?.amount || 30) / 30 * CELL_HEIGHT + 'px' }
  }, [task])

  return (
    <div className='task-card' style={style}>
      { completeTask }
      { task.content }

      <div className="task-card__draggable">
        { draggableTask }
      </div>
    </div>
  );
};
