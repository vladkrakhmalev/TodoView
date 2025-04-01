import { FC } from 'react';
import './CalendarColumn.css'
import { ITask, TaskCard } from '@entities/task';
import { IDimensions } from '@shared/types';
import { AddTaskWrapper } from '@features/add-task';

interface IProps {
  tasks: ITask[]
  date: string
  dimensions: IDimensions
  parentTop?: number
  columnRef?: React.RefObject<HTMLDivElement | null>
}

export const CalendarColumn: FC<IProps> = ({ tasks, date, dimensions, parentTop, columnRef }) => {

  return (
    <div className="calendar-column" ref={columnRef}>
      <AddTaskWrapper date={date} dimensions={dimensions} parrentTop={parentTop} />
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
