import { FC, FormEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import './ProjectForm.css'
import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { IProjectForm } from '../../model/project.types'
import { useTranslation } from 'react-i18next'

interface IProps {
  title: string
  defaultForm?: Partial<IProjectForm>
  isLoading: boolean
  isDeleting?: boolean
  onSubmit: (form: IProjectForm) => void
  onDelete?: () => void
}

const initialForm: IProjectForm = {
  name: '',
}

export const ProjectForm: FC<IProps> = props => {
  const { t } = useTranslation()
  const { title, defaultForm, isLoading, isDeleting, onSubmit, onDelete } =
    props

  const [form, setForm] = useState<IProjectForm>({
    ...initialForm,
    ...defaultForm,
  })
  const firstInputRef = useRef<HTMLInputElement>(null)

  const handlerChange = (value: string, field: keyof IProjectForm) => {
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
    <form className='project-form' onSubmit={handlerSubmit}>
      <p className='project-form__title'>{title}</p>

      <Input
        inputRef={firstInputRef}
        value={form.name}
        required
        placeholder={t('Введите название проекта')}
        label={t('Название')}
        onUpdate={value => handlerChange(value, 'name')}
      />

      <div className='project-form__buttons'>
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
