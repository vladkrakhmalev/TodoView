import { FC, MouseEvent, useState } from 'react';
import './CompleteTask.css'
import clsx from 'clsx';
import { useCompleteTask } from '@entities/task';

interface IProps {
  taskId: string
}

export const CompleteTask: FC<IProps> = ({ taskId }) => {
  const { mutate: completeTask } = useCompleteTask()
  const [isComplete, setIsComplete] = useState(false)

  const handlerComplete = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    completeTask(taskId)
    setIsComplete(true)
  }

  return (
    <div
      className={clsx('complete-task', isComplete && '_complete')}
      onClick={handlerComplete}
    >
      <i className='complete-task__check fi fi-rr-check'/> 
    </div>
  )
}