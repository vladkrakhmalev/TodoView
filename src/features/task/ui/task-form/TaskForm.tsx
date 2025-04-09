import { FC, FormEvent, useEffect, useState } from 'react';
import './TaskForm.css'
import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';
import { ITaskForm } from '../../model/task';

interface IProps {
  title: string
  defaultForm?: Partial<ITaskForm>
  firstInputRef: React.RefObject<HTMLInputElement | null>
  isLoading: boolean
  onSubmit: (form: ITaskForm) => void
}

const initialForm: ITaskForm = {
  content: '',
  date: '',
  time: ''
}

export const TaskForm: FC<IProps> = ({ title, defaultForm, firstInputRef, isLoading, onSubmit }) => {
  
  const [form, setForm] = useState<ITaskForm>({ ...initialForm, ...defaultForm })

  const handlerChange = (value: string, field: keyof ITaskForm) => {
    setForm({...form, [field]: value})
  }

  const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(form)
  }

  useEffect(() => {
    setForm({ ...initialForm, ...defaultForm })
  }, [defaultForm])

  return (
    <form className='task-form' onSubmit={handlerSubmit}>
      <p className='task-form__title'>{title}</p>

      <Input
        inputRef={firstInputRef}
        value={form.content}
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

      <Button isLoading={isLoading} fullWidth variant='primary'>Сохранить</Button>
    </form>
  );
};