import { FC, useMemo } from 'react'
import './CalendarColumns.css'
import { CalendarColumnTime } from '../calendar-column-time/CalendarColumnTime'
import { useTasks } from '@entities/task'
import { CalendarColumn } from '../calendar-column/CalendarColumn'
import { useCalendarStore } from '../../model/calendarStore'
import { getWeekFilter } from '../../model/calendarHelpers'
import { useWeekDays } from '../../hooks/useWeekDays'
import clsx from 'clsx'
import { DragTaskContextProvider } from '@features/drag-task'
import { getWeekdaysWithTasks } from '@entities/task/lib/taskHelpers'

export const CalendarColumns: FC = () => {
  const { startDate } = useCalendarStore()

  const filter = useMemo(() => getWeekFilter(startDate), [startDate])
  const { data, isLoading } = useTasks(filter)
  const weekdaysWithTasks = useMemo(
    () => getWeekdaysWithTasks(data?.results),
    [data]
  )

  const weekDays = useWeekDays(startDate)

  return (
    <div className='calendar-columns'>
      <div
        className={clsx('calendar-columns__loader', isLoading && '_active')}
      ></div>
      <CalendarColumnTime />

      <DragTaskContextProvider>
        {weekdaysWithTasks.days.map((day, idx) => (
          <CalendarColumn
            key={idx}
            day={day}
            date={weekDays[idx].format('YYYY-MM-DD')}
          />
        ))}
      </DragTaskContextProvider>
    </div>
  )
}
