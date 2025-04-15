import { FC, ReactNode, useState } from 'react';
import './DragTask.css'
import { pointerWithin, DndContext, DragEndEvent, DragMoveEvent } from '@dnd-kit/core';
import { useUpdateTask, convertDndToTask } from '@entities/task';

interface IProps {
  children: ReactNode
  taskHeight: number
  taskWidth: number
}

export const DragTaskContext: FC<IProps> = ({ children, taskHeight, taskWidth }) => {
  const { mutate: updateTask } = useUpdateTask()
  const [shadowTop, setShadowTop] = useState<number | null>(null)
  const [shadowLeft, setShadowLeft] = useState<number>(0)

  const handleDragMove = (event: DragMoveEvent) => {
    const pointerY = event.delta?.y + (event.active.data.current?._top || 0);
    const snappedTop = Math.round(pointerY / taskHeight * 2) / 2 * taskHeight;
    if (event.over?.rect) {
      setShadowLeft((event.over?.rect.left) - 20)
      setShadowTop(snappedTop);
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    setShadowTop(null)
    if (event.active.id && event.over?.id) {
      const newTask = convertDndToTask(event, taskHeight)
      updateTask(newTask)
    }
  }

  const style = {
    top: `${shadowTop}px`,
    left: `${shadowLeft}px`,
    width: `${taskWidth - 2}px`,
    height: `${taskHeight / 2}px`,
  }

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
    >
      {children}

      {shadowTop !== null && <div className='drag-task__shadow' style={style}/>}
    </DndContext>
  );
};
