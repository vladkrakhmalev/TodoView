import { FC, MouseEvent, useState } from 'react'
import { Button } from '@shared/ui/button'
import { Modal } from '@shared/ui/modal'
import { useUpdateProject, ProjectForm } from '@entities/project'
import { UpdateProjectArgs, Project } from '@doist/todoist-api-typescript'
import { useTranslation } from 'react-i18next'

interface IProps {
  project: Project
}

export const UpdateProjectButton: FC<IProps> = ({ project }) => {
  const { t } = useTranslation()
  const { mutateAsync: updateProject, isPending } = useUpdateProject()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const defaultForm = { name: project.name }

  const handlerOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsOpen(true)
  }

  const handlerClose = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsOpen(false)
  }

  const handlerSubmit = async (form: UpdateProjectArgs) => {
    console.log(form)
    await updateProject({ id: project.id, data: form })
    setIsOpen(false)
  }

  return (
    <>
      <Button
        iconBefore='pencil'
        variant='secondary'
        size='small'
        onClick={handlerOpen}
      >
        {t('Редактировать')}
      </Button>

      <Modal isOpen={isOpen} onClose={handlerClose}>
        <ProjectForm
          title={t('Редактировать проект')}
          isLoading={isPending}
          defaultForm={defaultForm}
          onSubmit={handlerSubmit}
        />
      </Modal>
    </>
  )
}
