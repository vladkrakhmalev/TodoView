import { FC, ReactNode, useState } from 'react';
import './DragTask.css'
import { pointerWithin, DndContext, DragEndEvent, DragMoveEvent } from '@dnd-kit/core';
import { convertDndToTask } from '@entities/task';
import { DragTaskContext } from '../model/dragTaskContext';
import { useUpdateTask } from '@entities/task';

interface IProps {
  children: ReactNode
}

export const DragTaskContextProvider: FC<IProps> = ({ children }) => {
  const { mutate: updateTask } = useUpdateTask()
  const [activeDroppableId, setActiveDroppableId] = useState<string | null>(null)

  const handleDragMove = (event: DragMoveEvent) => {
    if (event.over?.id) {
      setActiveDroppableId(String(event.over.id));
    } else {
      setActiveDroppableId(null);
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    if (event.active.id && activeDroppableId) {
      const newTask = convertDndToTask(event.active.id, activeDroppableId)
      updateTask(newTask)
    }
    
    setActiveDroppableId(null);
  }

  return (
    <DragTaskContext.Provider value={{ activeDroppableId }}>
      <DndContext
        collisionDetection={pointerWithin}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      >
        {children}
      </DndContext>
    </DragTaskContext.Provider>
  );
};
