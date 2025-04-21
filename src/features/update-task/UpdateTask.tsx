import { FC, MouseEvent, ReactNode, useMemo, useRef, useState } from 'react';
import { Modal } from '@shared/ui/modal';
import { TaskForm, ITask, ITaskForm, useUpdateTask, convertFormToTask, convertTaskToForm, useDeleteTask } from '@entities/task';

interface IProps {
  task: ITask
  children: ReactNode
}

export const UpdateTask: FC<IProps> = ({ task, children }) => {
  const { mutateAsync: updateTask, isPending: isUpdatePending } = useUpdateTask()
  const { mutateAsync: deleteTask, isPending: isDeletePending } = useDeleteTask()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const firstInputRef = useRef<HTMLInputElement>(null)
  const defaultForm = useMemo(() => convertTaskToForm(task), [task])

  const handlerOpen = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    setIsOpen(true)
    firstInputRef.current?.focus()
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
        firstInputRef={firstInputRef}
        isLoading={isUpdatePending}
        isDeleting={isDeletePending}
        onSubmit={handlerSubmit}
        onDelete={handlerDelete}
      />
    </Modal>
  </>)
}