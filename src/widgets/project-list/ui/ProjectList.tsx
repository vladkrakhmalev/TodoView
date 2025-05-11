import { FC } from 'react'
import './ProjectList.css'
import { useProjects } from '@entities/project/api/projectServices'
import { ProjectCard } from '../../../entities/project/ui/project-card/ProjectCard'
import { ProjectCardSkeleton } from '../../../entities/project/ui/project-card/ProjectCardSkeleton'
import { AddProjectButton } from '@features/add-project'
import { useTranslation } from 'react-i18next'

export const ProjectList: FC = () => {
  const { t } = useTranslation()
  const { data, isLoading } = useProjects()
  const projects = data?.results || []
  const isEmpty = projects.length === 0 && !isLoading

  return (
    <div className='project-list'>
      <h1 className='project-list__title'>{t('Проекты')}</h1>

      <div className='project-list__body'>
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}

        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}

        {!isLoading && <AddProjectButton long />}

        {isEmpty && <p className='project-list__empty'>{t('Нет проектов')}</p>}
      </div>
    </div>
  )
}
