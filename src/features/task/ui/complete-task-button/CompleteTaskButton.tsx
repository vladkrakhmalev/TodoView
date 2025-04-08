import { FC, useState } from 'react';
import './CompleteTaskButton.css'
import { useCompleteTask } from '@entities/task';
import clsx from 'clsx';

interface IProps {
  taskId: string
}

export const CompleteTaskButton: FC<IProps> = ({ taskId }) => {
  const { mutate: completeTask } = useCompleteTask()
  const [isComplete, setIsComplete] = useState(false)

  const handlerComplete = () => {
    completeTask(taskId)
    setIsComplete(true)
  }

  return (
    <div
      className={clsx('complete-task-button', isComplete && '_complete')}
      onClick={handlerComplete}
    >
      <i className='complete-task-button__check fi fi-rr-check'/> 
    </div>
  )
}