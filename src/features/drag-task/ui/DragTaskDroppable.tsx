import { FC, ReactNode } from 'react'
import './DragTask.css'
import { useDroppable } from '@dnd-kit/core'
import { useDragTaskContext } from '../model/dragTaskContext'
import clsx from 'clsx'

interface IProps {
  id: string
  children: ReactNode
}

export const DragTaskDroppable: FC<IProps> = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id })
  const { activeDroppableId } = useDragTaskContext()
  const isActive = activeDroppableId === id

  return (
    <div
      className={clsx('drag-task__droppable', isActive && '_active')}
      ref={setNodeRef}
    >
      {children}
      {isActive && <div className='drag-task__shadow' />}
    </div>
  )
}
