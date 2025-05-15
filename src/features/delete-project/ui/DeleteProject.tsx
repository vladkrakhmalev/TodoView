import { FC, useState } from 'react'
import './DeleteProject.css'
import { Button } from '@shared/ui/button'
import { useDeleteProject } from '@entities/project'
import { useNavigate } from 'react-router'
import { Modal } from '@shared/ui/modal'
import { useTranslation } from 'react-i18next'

interface IProps {
  projectId: string
}

export const DeleteProject: FC<IProps> = ({ projectId }) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { mutateAsync: deleteProject, isPending } = useDeleteProject()

  const handlerDelete = async () => {
    await deleteProject(projectId)
    navigate('/projects')
  }

  return (
    <>
      <Button
        variant='danger'
        iconBefore='trash'
        size='small'
        onClick={() => setIsOpen(true)}
      >
        {t('Удалить')}
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className='delete-project__modal'>
          <p className='delete-project__title'>{t('Удалить проект?')}</p>
          <p className='delete-project__text'>
            {t('Вы уверены что хотите удалить проект и все его задачи?')}
          </p>

          <Button
            variant='danger'
            iconBefore='trash'
            fullWidth
            isLoading={isPending}
            onClick={handlerDelete}
          >
            {t('Удалить')}
          </Button>
        </div>
      </Modal>
    </>
  )
}
