import { FC, useMemo } from 'react'
import { useTasks } from '@entities/task'
import { UpdateTask } from '@features/update-task'
import './TodayPage.css'
import { TaskCard } from '@entities/task'
import { Spiner } from '@shared/ui/spiner'
import { AddTaskButton } from '@features/add-task'
import { useProjects } from '@entities/project'

const TodayPage: FC = () => {
  const { data, isLoading: isTasksLoading } = useTasks('сегодня')
  const { isLoading: isProjectsLoading } = useProjects()
  const tasks = useMemo(() => data?.results || [], [data])

  const title = useMemo(() => {
    if (tasks.length) return `Задачи на сегодня (${tasks.length})`
    return 'Задачи на сегодня'
  }, [tasks])

  const isLoading = isTasksLoading || isProjectsLoading
  const isEmpty = useMemo(() => tasks.length === 0 && !isLoading, [tasks, isLoading])

  return (
    <div className="today-page">
      <div className="today-page__header">
        <h1 className="today-page__title">
          {title}
        </h1>

        <AddTaskButton/>
      </div>

      {isLoading && <Spiner full/>}

      {isEmpty &&
        <div className="today-page__empty">
          На сегодня задач нет
        </div>
      }

      {!isEmpty && !isLoading && (
        <div className="today-page__list">
          {tasks.map(task => (
            <UpdateTask key={task.id} task={task} isResize={false}>
              <TaskCard task={task} />
            </UpdateTask>
          ))}
        </div>
      )}
    </div>
  )
}

export default TodayPage 