import { FC } from 'react'
import './CalendarHeader.css'
import { useCalendarStore } from '../../model/calendarStore'
import { Button } from '@shared/ui/button'
import { Switcher } from '@shared/ui/switcher'
import { FIRST_COLUMN_WIDTH } from '@shared/config/calendar'
import { useTranslation } from 'react-i18next'

export const CalendarHeader: FC = () => {
  const { t } = useTranslation()
  const { startDate, prevWeek, nextWeek, resetWeek } = useCalendarStore()
  const month = startDate.format('MMMM YYYY')

  return (
    <div
      className='calendar-header'
      style={{ paddingLeft: FIRST_COLUMN_WIDTH }}
    >
      <div className='calendar-header__arrows'>
        <Button iconBefore='angle-left' onClick={prevWeek} />
        <Button iconBefore='calendar-day' onClick={resetWeek} />
        <Button iconBefore='angle-right' onClick={nextWeek} />
      </div>

      <p className='calendar-header__title'>{month}</p>

      <Switcher
        defaultValue='week'
        options={[
          { value: 'day', title: t('День') },
          { value: 'week', title: t('Неделя') },
          { value: 'month', title: t('Месяц') },
        ]}
        onChange={() => {}}
      />
    </div>
  )
}
