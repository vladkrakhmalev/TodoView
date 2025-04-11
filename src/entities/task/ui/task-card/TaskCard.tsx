import { FC, ReactNode, useMemo } from 'react';
import './TaskCard.css'
import { ITask, IEmptyTask } from '@entities/task/model/task';

interface IProps {
  task: ITask | IEmptyTask
  isEmpty?: boolean
  completeTask?: ReactNode
}

export const TaskCard: FC<IProps> = ({ task, isEmpty, completeTask }) => {
  const style = useMemo(() => {
    return {top: `${task._top}px`, height: `${task._height - 2}px`, width: `${task._width - 2}px`}
  }, [task])

  return (
    <div className='task-card' style={style}>
      { !isEmpty && completeTask }
      { task.content }
    </div>
  );
};
