import { FC, useMemo } from 'react';
import './TaskCard.css'
import { ITask } from '@entities/task';

interface IProps {
  task: ITask
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
