import { FC } from 'react'
import './ProjectPage.css'
import { useParams } from 'react-router'
import { TaskList } from '@widgets/task-list'
import { ProjectHeader } from '@widgets/project-header'

const ProjectPage: FC = () => {
  const { id = '' } = useParams()

  return (
    <div className='project-page'>
      <ProjectHeader projectId={id} />
      <TaskList projectId={id} />
    </div>
  )
}

export default ProjectPage
