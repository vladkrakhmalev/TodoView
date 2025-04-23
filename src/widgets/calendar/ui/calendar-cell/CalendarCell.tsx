import { FC } from 'react';
import './CalendarCell.css'
import { CELL_HEIGHT } from '@shared/config/calendar';
import { Task } from '@doist/todoist-api-typescript';
import { AddTaskWrapper } from '@features/add-task';
import { CompleteTask } from '@features/complete-task';
import { UpdateTask } from '@features/update-task';
import { DragTaskDraggable, DragTaskDroppable } from '@features/drag-task';

interface IProps {
  date: string,
  time: string,
  tasks: Task[]
}

export const CalendarCell: FC<IProps> = ({ date, time, tasks }) => {

  return (
    <div className='calendar-cell' style={{ height: `${CELL_HEIGHT}px` }}>
      <DragTaskDroppable id={`${date}_${time}`}>
        {tasks.map(task =>
          <UpdateTask key={task.id} task={task}>
            <DragTaskDraggable task={task} completeTask={<CompleteTask taskId={task.id}/>}/>
          </UpdateTask>
        )}
      </DragTaskDroppable>

      <AddTaskWrapper date={date} time={time} />
    </div>
  );
};
