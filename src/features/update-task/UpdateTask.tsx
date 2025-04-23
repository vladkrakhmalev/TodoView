import { FC, MouseEvent, ReactNode, useMemo, useState } from 'react';
import { Modal } from '@shared/ui/modal';
import { TaskForm, ITaskForm, useUpdateTask, convertFormToTask, convertTaskToForm, useDeleteTask } from '@entities/task';
import { Task } from '@doist/todoist-api-typescript';

interface IProps {
  task: Task
  children: ReactNode
}

export const UpdateTask: FC<IProps> = ({ task, children }) => {
  const { mutateAsync: updateTask, isPending: isUpdatePending } = useUpdateTask()
  const { mutateAsync: deleteTask, isPending: isDeletePending } = useDeleteTask()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const defaultForm = useMemo(() => convertTaskToForm(task), [task])

  const handlerOpen = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    setIsOpen(true)
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

  return (<>
    <div onClick={handlerOpen}>
      {children}
    </div>

    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <TaskForm
        title='Редактировать задачу'
        defaultForm={defaultForm}
        isLoading={isUpdatePending}
        isDeleting={isDeletePending}
        onSubmit={handlerSubmit}
        onDelete={handlerDelete}
      />
    </Modal>
  </>)
}