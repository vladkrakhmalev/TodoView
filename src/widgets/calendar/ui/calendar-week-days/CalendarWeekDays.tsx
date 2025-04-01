import { FC } from 'react';
import './CalendarWeekDays.css'
import { FIRST_COLUMN_WIDTH } from '../../config';
import { useCalendarStore } from '../../model/calendarStore';
import { useWeekDays } from '../../hooks/useWeekDays';

export const CalendarWeekDays: FC = () => {
  const { startDate } = useCalendarStore()
  const weekDays = useWeekDays(startDate)

  return (
    <div className="calendar-week-days" style={{paddingLeft: `${FIRST_COLUMN_WIDTH}px`}}>
      {weekDays.map((day, idx) =>
        <p key={idx} className="calendar-week-days__day">
          {day.format("dd DD MMM")} 
        </p>
      )}
    </div>
  );
};
