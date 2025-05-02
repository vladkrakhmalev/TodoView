import { FC, useMemo } from 'react'
import './TaskCard.css'
import { Task } from '@doist/todoist-api-typescript'
import { CompleteTask } from '@features/complete-task'
import { useProjects } from '@entities/project'
import { getTimeDiapason } from '@shared/lib/time'

interface IProps {
  task: Task
}

export const TaskCard: FC<IProps> = ({ task }) => {
  const { data } = useProjects()
  const taskProject = useMemo(() => {
    return data?.results?.find(project => project.id === task.projectId)
  }, [data, task.projectId])

  console.log(task.due?.datetime, task.duration)

  return (
    <div className="task-card">
      <CompleteTask taskId={task.id} size={20} />

      <div className="task-card__content">
        <div className="task-card__title">{task.content}</div>

        <div className="task-card__details">
          {task.due &&
            <span className="task-card__time">
              {getTimeDiapason(task.due.datetime, task.duration?.amount)}
            </span>
          }

          {taskProject &&
            <span className="task-card__project">
              {taskProject.name}
            </span>
          }
        </div>
      </div>
    </div>
  )
} 