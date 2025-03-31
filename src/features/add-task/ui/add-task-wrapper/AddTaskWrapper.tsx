import { FC, MouseEvent, useState } from 'react';
import './AddTaskWrapper.css'
import { ITask, TaskCard } from '@entities/task';
import { IDimensions } from '@shared/types';
import { AddTaskFormModal } from '../add-task-form-modal';
import { getTopByСoordinates, getTimeByСoordinates } from '../../model/addTaskHelpers';
import { IAddTaskForm } from '../../model/addTask';

interface IProps {
  date: string
  dimensions: IDimensions,
  parrentTop?: number
}

export const AddTaskWrapper: FC<IProps> = ({ date, dimensions, parrentTop = 0 }) => {
  const [newTask, setNewTask] = useState<ITask | null>(null)
  const [defaultForm, setDefaultForm] = useState<Partial<IAddTaskForm>>({ date })

  const handlerClick = (event: MouseEvent<HTMLDivElement>) => {
    const _top = getTopByСoordinates(event, parrentTop, dimensions)
    const time = getTimeByСoordinates(event, parrentTop, dimensions)
    setDefaultForm(defaultForm => ({ ...defaultForm, time }))
    // TODO Исправить TS проблему
    setNewTask({ content: 'Введите название', _top, _width: dimensions.width })
  }

  const trigger = (
    <div className='add-task-wrapper' onClick={handlerClick}>
      {newTask && <TaskCard task={newTask}/>}
    </div>
  )

  return (
    <AddTaskFormModal
      defaultForm={defaultForm}
      trigger={trigger}
      onClose={() => setNewTask(null)}
    />
  )
};
