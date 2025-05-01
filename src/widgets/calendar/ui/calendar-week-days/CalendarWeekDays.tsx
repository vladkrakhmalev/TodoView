import { FC } from 'react';
import './CalendarWeekDays.css'
import { useCalendarStore } from '../../model/calendarStore';
import { useWeekDays } from '../../hooks/useWeekDays';
import { FIRST_COLUMN_WIDTH } from '@shared/config/calendar';
import dayjs from 'dayjs';
import clsx from 'clsx';

export const CalendarWeekDays: FC = () => {
  const { startDate } = useCalendarStore()
  const weekDays = useWeekDays(startDate)

  const isToday = (day: dayjs.Dayjs) => day.isSame(dayjs(), "day")

  return (
    <div className="calendar-week-days">

      <div style={{width: `${FIRST_COLUMN_WIDTH}px`}}/>

      {weekDays.map((day, idx) =>
        <div key={idx} className={clsx("calendar-week-days__day", isToday(day) && "_active")}>
          <span className='calendar-week-days__day-title'>
            {day.format("DD")} 
          </span>
          <span className='calendar-week-days__day-label'>
            {day.format("dd")} 
          </span>
        </div>
      )}
    </div>
  );
};
