import { FC, ReactNode, useMemo } from 'react';
import './TaskCard.css'
import { ITask, IEmptyTask } from '@entities/task/model/task';

interface IProps {
  task: ITask | IEmptyTask
  isEmpty?: boolean
  completeTask?: ReactNode
  draggableTask?: ReactNode
}

export const TaskCard: FC<IProps> = ({ task, isEmpty, completeTask, draggableTask }) => {
  const style = useMemo(() => {
    return {top: `${task._top}px`, height: `${task._height - 2}px`, width: `${task._width - 4}px`}
  }, [task])

  return (
    <div className='task-card' style={style}>
      { !isEmpty && completeTask }
      { task.content }

      <div className="task-card__draggable">
        { !isEmpty && draggableTask }
      </div>
    </div>
  );
};
