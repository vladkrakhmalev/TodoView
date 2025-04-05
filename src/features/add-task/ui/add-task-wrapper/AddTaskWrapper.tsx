import { FC, MouseEvent, useState } from 'react';
import './AddTaskWrapper.css'
import { TaskCard, IEmptyTask } from '@entities/task';
import { IDimensions } from '@shared/types';
import { AddTaskFormModal } from '../add-task-form-modal';
import { getTopByСoordinates, getTimeByСoordinates } from '../../model/addTaskHelpers';
import { IAddTaskForm } from '../../model/addTask';

interface IProps {
  date: string
  dimensions: IDimensions
}

export const AddTaskWrapper: FC<IProps> = ({ date, dimensions }) => {
  const [newTask, setNewTask] = useState<IEmptyTask | null>(null)
  const [defaultForm, setDefaultForm] = useState<Partial<IAddTaskForm>>({ date })

  const handlerClick = (event: MouseEvent<HTMLDivElement>) => {
    const _top = getTopByСoordinates(event, dimensions)
    const time = getTimeByСoordinates(event, dimensions)
    setDefaultForm(defaultForm => ({ ...defaultForm, time }))
    setNewTask({ content: 'Новая задача', _top, _width: dimensions.width })
  }

  const trigger = (
    <div className='add-task-wrapper' onClick={handlerClick}>
      {newTask && <TaskCard task={newTask} isEmpty={true}/>}
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
