import { FC } from 'react';
import { TaskForm } from '../task-form/TaskForm';
import { Button } from '@shared/ui/button';

export const AddTaskButton: FC = () => {

  const trigger = (
    <Button variant='primary' iconBefore='plus' className='add-task'/>
  )

  return (
    <TaskForm trigger={trigger}/>
  );
};
