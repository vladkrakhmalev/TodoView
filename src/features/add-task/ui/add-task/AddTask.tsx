import { FC } from 'react';
import './AddTask.css'
import { AddTaskFormModal } from '../add-task-form-modal';
import { Button } from '@shared/ui/button';

export const AddTask: FC = () => {

  const trigger = (
    <Button variant='primary' iconBefore='plus' className='add-task'/>
  )

  return (
    <AddTaskFormModal trigger={trigger}/>
  );
};
