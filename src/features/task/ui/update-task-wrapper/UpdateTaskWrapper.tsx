import { FC, ReactNode, useMemo, useRef, useState } from 'react';
import { ITask, useUpdateTask } from '@entities/task';
import { TaskForm } from '../task-form/TaskForm';
import { convertFormToTask, convertTaskToForm } from '@features/task/lib/taskHelpers';
import { Modal } from '@shared/ui/modal';
import { ITaskForm } from '@features/task/model/task';

interface IProps {
  task: ITask
  children: ReactNode
}

export const UpdateTaskWrapper: FC<IProps> = ({ task, children }) => {
  const { mutateAsync: updateTask, isPending } = useUpdateTask()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const firstInputRef = useRef<HTMLInputElement>(null)
  const defaultForm = useMemo(() => convertTaskToForm(task), [task])

  const handlerOpen = () => {
    setIsOpen(true)
    firstInputRef.current?.focus()
  }

  const handlerSubmit = async (form: ITaskForm) => {
    const data = convertFormToTask(form)
    await updateTask({ id: task.id, data })
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
        isLoading={isPending}
        onSubmit={handlerSubmit}
      />
    </Modal>
  </>)
}