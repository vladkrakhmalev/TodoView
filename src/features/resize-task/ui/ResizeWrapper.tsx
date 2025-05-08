import { FC } from 'react'
import './ResizeWrapper.css'
import { useResizeTask } from '../lib/useResizeTask'
import { Task } from '@doist/todoist-api-typescript'

interface IProps {
  task: Task
  onResize: (isResize: boolean) => void
}

export const ResizeWrapper: FC<IProps> = ({ task, onResize }) => {
  const { handleMouseDown } = useResizeTask({ task, onResize })

  return <button className='resize-wrapper' onMouseDown={handleMouseDown} />
}
