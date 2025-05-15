import { FC, FormEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import './TaskForm.css'
import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { ITaskForm } from '../../model/task'
import { useTranslation } from 'react-i18next'

interface IProps {
  title: string
  defaultForm?: Partial<ITaskForm>
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

export const TaskForm: FC<IProps> = props => {
  const { t } = useTranslation()
  const { title, defaultForm, isLoading, isDeleting, onSubmit, onDelete } =
    props

  const [form, setForm] = useState<ITaskForm>({
    ...initialForm,
    ...defaultForm,
  })
  const firstInputRef = useRef<HTMLInputElement>(null)

  const handlerChange = (value: string, field: keyof ITaskForm) => {
    setForm({ ...form, [field]: value })
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

  useEffect(() => {
    firstInputRef.current?.focus()
  }, [])

  return (
    <form className='task-form' onSubmit={handlerSubmit}>
      <p className='task-form__title'>{title}</p>

      <Input
        inputRef={firstInputRef}
        value={form.content}
        required
        placeholder={t('Введите название задачи')}
        label={t('Название')}
        onUpdate={value => handlerChange(value, 'content')}
      />

      <Input
        value={form.date}
        type='date'
        label={t('Дата')}
        onUpdate={value => handlerChange(value, 'date')}
      />

      <Input
        value={form.timeStart}
        type='time'
        className='_short'
        label={t('Время начала')}
        onUpdate={value => handlerChange(value, 'timeStart')}
      />

      <Input
        value={form.timeEnd}
        type='time'
        className='_short'
        label={t('Время окончания')}
        onUpdate={value => handlerChange(value, 'timeEnd')}
      />

      <div className='task-form__buttons'>
        <Button
          isLoading={isLoading}
          iconBefore='disk'
          variant='primary'
          fullWidth
        >
          {t('Сохранить')}
        </Button>

        {onDelete && (
          <Button
            isLoading={isDeleting}
            iconBefore='trash'
            variant='danger'
            onClick={handlerDangerClick}
          />
        )}
      </div>
    </form>
  )
}
