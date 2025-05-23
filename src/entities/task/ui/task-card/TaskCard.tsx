import { FC, useMemo } from 'react'
import './TaskCard.css'
import { Project, Task } from '@doist/todoist-api-typescript'
import { CompleteTask } from '@features/complete-task'
import { getTimeDiapason } from '@shared/lib/time'

interface IProps {
  task: Task
  projects: Project[]
}

export const TaskCard: FC<IProps> = ({ task, projects }) => {
  const taskProject = useMemo(() => {
    return projects.find(project => project.id === task.projectId)
  }, [projects, task.projectId])

  const timeDiapason = getTimeDiapason(
    task.due?.datetime,
    task.duration?.amount
  )

  return (
    <div className='task-card'>
      <CompleteTask taskId={task.id} size={20} />

      <div className='task-card__content'>
        <div className='task-card__title'>{task.content}</div>

        <div className='task-card__details'>
          {timeDiapason && (
            <span className='task-card__detail'>{timeDiapason}</span>
          )}

          {taskProject && (
            <span className='task-card__detail'>{taskProject.name}</span>
          )}
        </div>
      </div>
    </div>
  )
}
