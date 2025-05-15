import { FC } from 'react'
import './ProjectCard.css'

export const ProjectCardSkeleton: FC = () => {
  return (
    <div className='project-card__skeleton'>
      <div className='project-card__skeleton-title'></div>
    </div>
  )
}
