import { FC, ReactNode } from 'react'
import { TaskCalendarCard } from '@entities/task'
import { useDraggable } from '@dnd-kit/core'
import { Task } from '@doist/todoist-api-typescript'

interface IProps {
  task: Task
  completeTask: ReactNode
  resizeTask: ReactNode
}

export const DragTaskDraggable: FC<IProps> = ({
  task,
  completeTask,
  resizeTask,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: task,
  })

  const style = {
    opacity: transform ? 0.5 : 1,
    transition: '0.2s',
  }

  const draggableTask = (
    <i className='fi fi-sr-grip-dots-vertical' {...listeners} {...attributes} />
  )

  return (
    <div ref={setNodeRef} style={style}>
      <TaskCalendarCard
        task={task}
        completeTask={completeTask}
        draggableTask={draggableTask}
        resizeTask={resizeTask}
      />
    </div>
  )
}
