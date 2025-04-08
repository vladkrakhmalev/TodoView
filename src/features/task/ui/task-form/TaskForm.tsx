import { FC, FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import './TaskForm.css'
import { Modal } from '@shared/ui/modal';
import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';
import { IAddTaskForm } from '../../model/task';
import { convertForm } from '../../lib/taskHelpers';
import { useAddTask } from '@entities/task';

interface IProps {
  trigger: ReactNode
  defaultForm?: Partial<IAddTaskForm>
  onClose?: () => void
}

const initialForm: IAddTaskForm = {
  content: '',
  date: '',
  time: ''
}

export const TaskForm: FC<IProps> = ({ trigger, defaultForm, onClose }) => {
  const { mutateAsync: addTask, isPending } = useAddTask()
  const [form, setForm] = useState<IAddTaskForm>({ ...initialForm, ...defaultForm })

  const modalRef = useRef<HTMLDivElement>(null)
  const firstInput = useRef<HTMLInputElement>(null)

  const handlerChange = (value: string, field: keyof IAddTaskForm) => {
    setForm({...form, [field]: value})
  }

  const handlerClose = () => {
    setForm({ ...initialForm, ...defaultForm })
    if (modalRef.current) modalRef.current.click()
    if (onClose) onClose()
  }

  const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newTask = convertForm(form)
    await addTask(newTask)
    handlerClose()
  }

  useEffect(() => {
    setForm(prev => ({ ...prev, ...defaultForm }))
  }, [defaultForm])

  return (
    <Modal trigger={trigger} wrapperRef={modalRef} onOpen={() => firstInput.current?.focus()} onClose={handlerClose}>
      <form className='task-form' onSubmit={handlerSubmit}>
        <p className='task-form__title'>Добавить задачу</p>

        <Input
          value={form.content}
          inputRef={firstInput}
          required
          placeholder='Название'
          onUpdate={(value) => handlerChange(value, 'content')}
        />

        <Input
          value={form.date}
          type='date'
          className='_short'
          onUpdate={(value) => handlerChange(value, 'date')}
        />

        <Input
          value={form.time}
          type='time'
          className='_short'
          onUpdate={(value) => handlerChange(value, 'time')}
        />

        <Button isLoading={isPending} fullWidth variant='primary'>Добавить</Button>
      </form>
    </Modal>
  );
};