import { FC, FormEvent, MouseEvent, useEffect, useState } from 'react';
import './TaskForm.css'
import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';
import { ITaskForm } from '../../model/task';

interface IProps {
  title: string
  defaultForm?: Partial<ITaskForm>
  firstInputRef: React.RefObject<HTMLInputElement | null>
  isLoading: boolean
  isDeleting?: boolean
  onSubmit: (form: ITaskForm) => void
  onDelete?: () => void
}

const initialForm: ITaskForm = {
  content: '',
  date: '',
  timeStart: '',
  timeEnd: '',
}

export const TaskForm: FC<IProps> = (props) => {
  const {
    title,
    defaultForm,
    firstInputRef,
    isLoading,
    isDeleting,
    onSubmit,
    onDelete,
  } = props
  
  const [form, setForm] = useState<ITaskForm>({ ...initialForm, ...defaultForm })

  const handlerChange = (value: string, field: keyof ITaskForm) => {
    setForm({...form, [field]: value})
  }

  const handlerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(form)
  }

  const handlerDangerClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (onDelete) onDelete()
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
        onUpdate={(value) => handlerChange(value, 'date')}
      />

      <Input
        value={form.timeStart}
        type='time'
        className='_short'
        onUpdate={(value) => handlerChange(value, 'timeStart')}
      />

      <Input
        value={form.timeEnd}
        type='time'
        className='_short'
        onUpdate={(value) => handlerChange(value, 'timeEnd')}
      />

      <div className="task-form__buttons">
        <Button
          isLoading={isLoading}
          iconBefore='disk'
          variant='primary'
          fullWidth
        >Сохранить</Button>

        {onDelete && 
          <Button
            isLoading={isDeleting}
            iconBefore='trash'
            variant='danger'
            onClick={handlerDangerClick}
          />
        }
      </div>
    </form>
  );
};