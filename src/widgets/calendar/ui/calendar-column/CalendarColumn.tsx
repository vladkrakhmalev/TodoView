import { FC } from 'react';
import './CalendarColumn.css'
import { ITask, TaskCard } from '@entities/task';
import { IDimensions } from '@shared/types';
import { AddTaskWrapper, CompleteTaskButton } from '@features/task';

interface IProps {
  tasks: ITask[]
  date: string
  dimensions: IDimensions
  columnRef?: React.RefObject<HTMLDivElement | null>
}

export const CalendarColumn: FC<IProps> = ({ tasks, date, dimensions, columnRef }) => {

  return (
    <div className="calendar-column" ref={columnRef}>
      <AddTaskWrapper date={date} dimensions={dimensions} />
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          completeTask={<CompleteTaskButton taskId={task.id}/>}
        />
      ))}
    </div>
  );
};
