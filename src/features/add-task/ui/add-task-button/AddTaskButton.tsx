import { FC, useRef, useState } from 'react';
import { Button } from '@shared/ui/button';
import { Modal } from '@shared/ui/modal';
import { TaskForm, ITaskForm, useAddTask, convertFormToTask, } from '@entities/task';

export const AddTaskButton: FC = () => {
  const { mutateAsync: addTask, isPending } = useAddTask()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const firstInputRef = useRef<HTMLInputElement>(null)

  const handlerOpen = ( ) => {
    setIsOpen(true)
    firstInputRef.current?.focus()
  }

  const handlerSubmit = async (form: ITaskForm) => {
    const newTask = convertFormToTask(form)
    await addTask(newTask)
    setIsOpen(false)
  }

  return (<>
    <Button
      variant='primary'
      iconBefore='plus'
      className='add-task'
      onClick={handlerOpen}
    />

    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <TaskForm
        title='Добавить задачу'
        firstInputRef={firstInputRef}
        isLoading={isPending}
        onSubmit={handlerSubmit}
      />
    </Modal>
  </>)
}