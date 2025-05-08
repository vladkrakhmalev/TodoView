import './TodayPage.css'
import { TaskList } from '@widgets/task-list'

const TodayPage = () => {
  return (
    <div className='today-page'>
      <h1 className='today-page__title'>Задачи на сегодня</h1>
      <TaskList filter='сегодня' />
    </div>
  )
}

export default TodayPage
