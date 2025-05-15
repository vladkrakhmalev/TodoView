import { FC, MouseEvent, ReactNode, useState } from 'react'
import { Modal } from '@shared/ui/modal'
import {
  TaskForm,
  ITaskForm,
  useUpdateTask,
  convertFormToTask,
  convertTaskToForm,
  useDeleteTask,
} from '@entities/task'
import { Task } from '@doist/todoist-api-typescript'
import { useTranslation } from 'react-i18next'

interface IProps {
  task: Task
  children: ReactNode
  isResize: boolean
}

export const UpdateTask: FC<IProps> = ({ task, children, isResize }) => {
  const { t } = useTranslation()
  const { mutateAsync: updateTask, isPending: isUpdatePending } =
    useUpdateTask()
  const { mutateAsync: deleteTask, isPending: isDeletePending } =
    useDeleteTask()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const defaultForm = convertTaskToForm(task)

  const handlerOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (!isResize) setIsOpen(true)
  }

  const handlerSubmit = async (form: ITaskForm) => {
    const data = convertFormToTask(form)
    await updateTask({ id: task.id, data })
    setIsOpen(false)
  }

  const handlerDelete = async () => {
    await deleteTask(task.id)
    setIsOpen(false)
  }

  return (
    <>
      <button onClick={handlerOpen}>{children}</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <TaskForm
          title={t('Редактировать задачу')}
          defaultForm={defaultForm}
          isLoading={isUpdatePending}
          isDeleting={isDeletePending}
          onSubmit={handlerSubmit}
          onDelete={handlerDelete}
        />
      </Modal>
    </>
  )
}
