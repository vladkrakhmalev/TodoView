import { FC, useState } from 'react'
import './AddTaskWrapper.css'
import { Modal } from '@shared/ui/modal'
import {
  TaskForm,
  ITaskForm,
  useAddTask,
  convertFormToTask,
} from '@entities/task'
import dayjs from '@shared/config/dayjs'
import clsx from 'clsx'

interface IProps {
  date: string
  time: string
}

export const AddTaskWrapper: FC<IProps> = ({ date, time }) => {
  const { mutateAsync: addTask, isPending } = useAddTask()

  const [defaultForm, setDefaultForm] = useState<Partial<ITaskForm>>({ date })
  const [showTask, setShowTask] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handlerOpen = () => {
    const timeEnd = dayjs(time, 'HH:mm').add(30, 'minute').format('HH:mm')
    setDefaultForm(defaultForm => ({
      ...defaultForm,
      timeStart: time,
      timeEnd,
    }))
    setShowTask(true)
    setIsOpen(true)
  }

  const handlerClose = () => {
    setDefaultForm({ date })
    setShowTask(false)
    setIsOpen(false)
  }

  const handlerSubmit = async (form: ITaskForm) => {
    const newTask = convertFormToTask(form)
    await addTask(newTask)
    handlerClose()
  }

  return (
    <>
      <button
        className={clsx('add-task-wrapper', showTask && '_shadow')}
        onClick={handlerOpen}
      />

      <Modal isOpen={isOpen} onClose={handlerClose}>
        <TaskForm
          title='Добавить задачу'
          defaultForm={defaultForm}
          isLoading={isPending}
          onSubmit={handlerSubmit}
        />
      </Modal>
    </>
  )
}
