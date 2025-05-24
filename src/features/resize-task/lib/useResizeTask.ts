import { useState, useCallback, useEffect, MouseEvent } from 'react'
import { convertResizeToTask, useUpdateTask } from '@entities/task'
import { CELL_HEIGHT } from '@shared/config/calendar'
import { Task } from '@doist/todoist-api-typescript'

interface IState {
  isResizing: boolean
  initialHeight: number
  initialY: number
}

interface IProps {
  task: Task
  onResize: (isResize: boolean) => void
}

export const useResizeTask = ({ task, onResize }: IProps) => {
  const { mutate: updateTask } = useUpdateTask()
  const [resizeState, setResizeState] = useState<IState>({
    isResizing: false,
    initialHeight: 0,
    initialY: 0,
  })

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      const initialHeight = ((task.duration?.amount || 30) / 30) * CELL_HEIGHT

      setResizeState({
        isResizing: true,
        initialHeight,
        initialY: e.clientY,
      })
    },
    [task]
  )

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (!resizeState.isResizing) return

      const deltaY = e.clientY - resizeState.initialY + CELL_HEIGHT / 2
      const newHeight =
        Math.max(
          CELL_HEIGHT,
          Math.floor((resizeState.initialHeight + deltaY) / CELL_HEIGHT) *
            CELL_HEIGHT
        ) - 4

      const taskElement = document.querySelector(
        `[data-task-id="${task.id}"]`
      ) as HTMLElement | null
      if (taskElement) taskElement.style.height = `${newHeight}px`
    },
    [resizeState, task.id]
  )

  const handleMouseUp = useCallback(() => {
    if (!resizeState.isResizing) return
    onResize(true)
    setTimeout(() => onResize(false), 100)

    setResizeState({
      isResizing: false,
      initialHeight: 0,
      initialY: 0,
    })

    const taskElement = document.querySelector(
      `[data-task-id="${task.id}"]`
    ) as HTMLElement | null
    if (!taskElement) return
    const newDuration =
      Math.floor((taskElement.offsetHeight + 4) / CELL_HEIGHT) * 30
    const newTask = convertResizeToTask(newDuration, task)
    updateTask(newTask)
  }, [resizeState, task, updateTask, onResize])

  useEffect(() => {
    if (resizeState.isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [resizeState.isResizing, handleMouseMove, handleMouseUp])

  return { handleMouseDown }
}
