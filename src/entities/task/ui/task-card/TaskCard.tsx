import { FC, useMemo } from 'react';
import './TaskCard.css'
import { ITask, IEmptyTask } from '@entities/task/model/task';

interface IProps {
  task: ITask | IEmptyTask
  isEmpty?: boolean
}

export const TaskCard: FC<IProps> = ({ task }) => {
  const style = useMemo(() => {
    return {top: `${task._top}px`, width: `${task._width}px`}
  }, [task])

  return (
    <div className='task-card' style={style}>
      { task.content }
    </div>
  );
};
