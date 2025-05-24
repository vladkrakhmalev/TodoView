import { FC, MouseEvent, useState } from 'react'
import { Button } from '@shared/ui/button'
import { Modal } from '@shared/ui/modal'
import { useAddProject, IProjectForm, ProjectForm } from '@entities/project'
import { useTranslation } from 'react-i18next'

interface IProps {
  long?: boolean
}

export const AddProjectButton: FC<IProps> = ({ long = false }) => {
  const { t } = useTranslation()
  const { mutateAsync: addProject, isPending } = useAddProject()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handlerOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsOpen(true)
  }

  const handlerClose = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsOpen(false)
  }

  const handlerSubmit = async (form: IProjectForm) => {
    await addProject(form)
    setIsOpen(false)
  }

  return (
    <>
      <Button
        iconBefore='plus-small'
        size={long ? 'big' : 'small'}
        fullWidth={long}
        onClick={handlerOpen}
      >
        {long ? t('Добавить проект') : ''}
      </Button>

      <Modal isOpen={isOpen} onClose={handlerClose}>
        <ProjectForm
          title={t('Добавить проект')}
          isLoading={isPending}
          onSubmit={handlerSubmit}
        />
      </Modal>
    </>
  )
}
