import { FC, MouseEvent, useRef, useState } from 'react';
import './AddTaskWrapper.css'
import { TaskCard, IEmptyTask, useAddTask } from '@entities/task';
import { IDimensions } from '@shared/types';
import { TaskForm } from '../task-form/TaskForm';
import { getTopByСoordinates, getTimeByСoordinates, convertFormToTask } from '../../lib/taskHelpers';
import { ITaskForm } from '../../model/task';
import { Modal } from '@shared/ui/modal';

interface IProps {
  date: string
  dimensions: IDimensions
}

export const AddTaskWrapper: FC<IProps> = ({ date, dimensions }) => {
  const { mutateAsync: addTask, isPending } = useAddTask()

  const [defaultForm, setDefaultForm] = useState<Partial<ITaskForm>>({ date })
  const [newTask, setNewTask] = useState<IEmptyTask | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const firstInputRef = useRef<HTMLInputElement>(null)

  const handlerOpen = (event: MouseEvent<HTMLDivElement>) => {
    const _top = getTopByСoordinates(event, dimensions)
    const time = getTimeByСoordinates(event, dimensions)
    setDefaultForm(defaultForm => ({ ...defaultForm, time }))
    setNewTask({ content: 'Новая задача', _top, _width: dimensions.width })
    setIsOpen(true)
    firstInputRef.current?.focus()
  }

  const handlerClose = () => {
    setDefaultForm({ date })
    setNewTask(null)
    setIsOpen(false)
  }

  const handlerSubmit = async (form: ITaskForm) => {
    const newTask = convertFormToTask(form)
    await addTask(newTask)
    handlerClose()
  }

  return (<>
    <div className='add-task-wrapper' onClick={handlerOpen}>
      {newTask && <TaskCard task={newTask} isEmpty={true}/>}
    </div>

    <Modal isOpen={isOpen} onClose={handlerClose}>
      <TaskForm
        title='Добавить задачу'
        defaultForm={defaultForm}
        firstInputRef={firstInputRef}
        isLoading={isPending}
        onSubmit={handlerSubmit}
      />
    </Modal>
  </>)
};
