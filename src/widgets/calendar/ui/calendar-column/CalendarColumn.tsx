import { FC } from 'react';
import './CalendarColumn.css'
import { CalendarCell } from '../calendar-cell/CalendarCell';
import { TIMES_WITH_HALF, TTimeSlot } from '@shared/config/calendar';
import { IDayWithTasks } from '@entities/task';

interface IProps {
  day: IDayWithTasks
  date: string
}

export const CalendarColumn: FC<IProps> = ({ day, date }) => {

  return (
    <div className="calendar-column">
      {TIMES_WITH_HALF.map((time: TTimeSlot) =>
        <CalendarCell
          key={time}
          date={date}
          time={time}
          tasks={day[time]}
        />
      )}
    </div>
  );
};
