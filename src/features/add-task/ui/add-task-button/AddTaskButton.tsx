import { FC, useState } from 'react';
import { Button } from '@shared/ui/button';
import { Modal } from '@shared/ui/modal';
import { TaskForm, ITaskForm, useAddTask, convertFormToTask, } from '@entities/task';

interface IProps {
  long?: boolean
  projectId?: string
}

export const AddTaskButton: FC<IProps> = ({ long = false, projectId }) => {
  const { mutateAsync: addTask, isPending } = useAddTask()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handlerOpen = () => {
    setIsOpen(true)
  }

  const handlerSubmit = async (form: ITaskForm) => {
    const newTask = convertFormToTask(form)
    await addTask({ ...newTask, projectId })
    setIsOpen(false)
  }

  return (<>
    <Button
      variant={long ? 'secondary' : 'primary'}
      iconBefore='plus'
      className='add-task'
      fullWidth={long}
      onClick={handlerOpen}
    >
      {long ? 'Добавить задачу' : ''}
    </Button>

    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <TaskForm
        title='Добавить задачу'
        isLoading={isPending}
        onSubmit={handlerSubmit}
      />
    </Modal>
  </>)
}