import './TodayPage.css'
import { TaskList } from '@widgets/task-list'
import { useTranslation } from 'react-i18next'

const TodayPage = () => {
  const { t } = useTranslation()

  return (
    <div className='today-page'>
      <h1 className='today-page__title'>{t('Задачи на сегодня')}</h1>
      <TaskList filter='сегодня' />
    </div>
  )
}

export default TodayPage
