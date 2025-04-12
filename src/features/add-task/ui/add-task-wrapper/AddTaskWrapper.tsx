import { FC, MouseEvent, useRef, useState } from 'react';
import './AddTaskWrapper.css'
import { Modal } from '@shared/ui/modal';
import { TaskForm, TaskCard, IEmptyTask, ITaskForm, useAddTask, getTopByСoordinates, getDateByСoordinates, convertFormToTask } from '@entities/task';
import dayjs from 'dayjs';

interface IProps {
  date: string
  taskHeight: number
  taskWidth: number
}

export const AddTaskWrapper: FC<IProps> = ({ date, taskHeight, taskWidth }) => {
  const { mutateAsync: addTask, isPending } = useAddTask()

  const [defaultForm, setDefaultForm] = useState<Partial<ITaskForm>>({ date })
  const [newTask, setNewTask] = useState<IEmptyTask | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const firstInputRef = useRef<HTMLInputElement>(null)

  const handlerOpen = (event: MouseEvent<HTMLDivElement>) => {
    const _top = getTopByСoordinates(event, taskHeight)
    const date = getDateByСoordinates(event, taskHeight)
    const timeStart = dayjs(date).format('HH:mm')
    const timeEnd = dayjs(date).add(30, 'minute').format('HH:mm')
    setDefaultForm(defaultForm => ({ ...defaultForm, timeStart, timeEnd }))
    setNewTask({ content: 'Новая задача', _top, _height: taskHeight / 2, _width: taskWidth })
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
