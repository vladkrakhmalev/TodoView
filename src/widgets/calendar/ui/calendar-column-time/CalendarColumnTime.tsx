import { FC } from 'react'
import './CalendarColumnTime.css'
import { CELL_HEIGHT, FIRST_COLUMN_WIDTH, TIMES } from '@shared/config/calendar'

export const CalendarColumnTime: FC = () => {
  return (
    <div
      className='calendar-column-time'
      style={{ width: `${FIRST_COLUMN_WIDTH}px` }}
    >
      {TIMES.map(time => (
        <p
          key={time}
          style={{ height: `${CELL_HEIGHT * 2}px` }}
          className='calendar-column-time__item'
        >
          {time}
        </p>
      ))}
    </div>
  )
}
