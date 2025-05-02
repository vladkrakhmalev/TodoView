import { FC, useMemo } from 'react'
import { useTasks } from '@entities/task'
import { UpdateTask } from '@features/update-task'
import './TaskList.css'
import { TaskCard } from '@entities/task'
import { useProjects } from '@entities/project'
import { TaskCardSkeleton } from '@entities/task/ui/task-card/TaskCardSkeleton'
import { AddTaskButton } from '@features/add-task'

interface IProps {
  filter?: string
  projectId?: string
}

export const TaskList: FC<IProps> = ({ filter, projectId }) => {
  const { data, isLoading: isTasksLoading } = useTasks({filter, projectId})
  const { data: projectsData, isLoading: isProjectsLoading } = useProjects()
  const tasks = useMemo(() => data?.results || [], [data])
  const projects = useMemo(() => projectsData?.results || [], [projectsData])

  const isLoading = isTasksLoading || isProjectsLoading
  const isEmpty = useMemo(() => tasks.length === 0 && !isLoading, [tasks, isLoading])

  return (
    <div className="task-list">
      {isLoading &&
        Array.from({ length: 6 }).map((_, index) => (
          <TaskCardSkeleton key={index} />
        ))
      }

      {!isLoading && tasks.map(task => (
        <UpdateTask key={task.id} task={task} isResize={false}>
          <TaskCard task={task} projects={projects} />
        </UpdateTask>
      ))}

      {!isLoading && <AddTaskButton long projectId={projectId} />}

      {isEmpty &&
        <div className="task-list__empty">
          Задач нет
        </div>
      }

    </div>
  )
}