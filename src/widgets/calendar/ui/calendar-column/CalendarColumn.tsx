import { FC } from 'react';
import './CalendarColumn.css'
import { ITask } from '@entities/task';
import { AddTaskWrapper } from '@features/add-task';
import { DragTaskDroppable, DragTaskDraggable } from '@features/drag-task';
import { UpdateTask } from '@features/update-task';
import { CompleteTask } from '@features/complete-task';
import { useCalendarStore } from '@widgets/calendar/model/calendarStore';

interface IProps {
  tasks: ITask[]
  date: string
}

export const CalendarColumn: FC<IProps> = ({ tasks, date }) => {
  const { taskHeight, taskWidth } = useCalendarStore()

  return (
    <div className="calendar-column">
      <DragTaskDroppable id={date}>
        <AddTaskWrapper date={date} taskHeight={taskHeight} taskWidth={taskWidth} />
        {tasks.map(task => (
          <UpdateTask key={task.id} task={task}>
            <DragTaskDraggable task={task} completeTask={<CompleteTask taskId={task.id}/>}/>
          </UpdateTask>
        ))}
      </DragTaskDroppable>
    </div>
  );
};
