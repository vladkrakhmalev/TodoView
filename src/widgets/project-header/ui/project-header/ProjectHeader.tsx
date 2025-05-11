import { FC, useEffect } from 'react'
import './ProjectHeader.css'
import { useProject } from '@entities/project'
import { Link } from 'react-router'
import { ProjectActions } from '../project-actions/ProjectActions'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

interface IProps {
  projectId: string
}

export const ProjectHeader: FC<IProps> = ({ projectId }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { data: project = null, isLoading, isError } = useProject(projectId)

  useEffect(() => {
    if (isError) navigate('/projects')
  }, [isError, navigate])

  return (
    <div className='project-header'>
      <div className='project-header__top'>
        <h1 className='project-header__title'>
          {isLoading && <div className='project-header__skeleton' />}
          {project?.name && (
            <span>
              {t('Проект')} "{project.name}"
            </span>
          )}
        </h1>

        {project && !project.isInboxProject && (
          <ProjectActions project={project} />
        )}
      </div>

      <div className='project-header__breadcrumbs'>
        {isLoading && (
          <>
            <div className='project-header__skeleton _small' />
            <div className='project-header__skeleton _small' />
          </>
        )}
        {project?.name && (
          <>
            <Link to='/projects' className='project-header__breadcrumbs-link'>
              {t('Проекты')}
            </Link>
            <span className='project-header__breadcrumbs-name'>
              {project.name}
            </span>
          </>
        )}
      </div>
    </div>
  )
}
