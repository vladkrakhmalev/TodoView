import { FC, useState } from 'react';
import './CalendarCell.css'
import { CELL_HEIGHT } from '@shared/config/calendar';
import { Task } from '@doist/todoist-api-typescript';
import { AddTaskWrapper } from '@features/add-task';
import { CompleteTask } from '@features/complete-task';
import { UpdateTask } from '@features/update-task';
import { DragTaskDraggable, DragTaskDroppable } from '@features/drag-task';
import { ResizeWrapper } from '@features/resize-task';

interface IProps {
  date: string,
  time: string,
  tasks: Task[]
}

export const CalendarCell: FC<IProps> = ({ date, time, tasks }) => {
  const [isResize, setIsResize] = useState<boolean>(false)

  return (
    <div className='calendar-cell' style={{ height: `${CELL_HEIGHT}px` }}>
      <DragTaskDroppable id={`${date}_${time}`}>
        {tasks.map(task =>
          <UpdateTask key={task.id} task={task} isResize={isResize}>
            <DragTaskDraggable
              task={task}
              completeTask={<CompleteTask taskId={task.id}/>}
              resizeTask={<ResizeWrapper task={task} onResize={setIsResize}/>}
            />
          </UpdateTask>
        )}
      </DragTaskDroppable>

      <AddTaskWrapper date={date} time={time} />
    </div>
  );
};
