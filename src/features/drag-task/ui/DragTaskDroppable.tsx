import { FC, ReactNode } from 'react';
import './DragTask.css'
import { useDroppable } from '@dnd-kit/core';

interface IProps {
  id: string
  children: ReactNode
}

export const DragTaskDroppable: FC<IProps> = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div className='drag-task__droppable' ref={setNodeRef}>
      {children}
    </div>
  );
};
