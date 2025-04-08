import { FC } from 'react';
import './CalendarHeader.css'
import { useCalendarStore } from '../../model/calendarStore';
import { Button } from '@shared/ui/button';
import { AddTaskButton } from '@features/task';

export const CalendarHeader: FC = () => {
  const { prevWeek, nextWeek, resetWeek } = useCalendarStore()

  return (
    <div className="calendar-header">
      <AddTaskButton/>

      <Button iconBefore="calendar-day" onClick={resetWeek}>
        Сегодня
      </Button>

      <div className="calendar-header__arrows">
        <Button iconBefore="angle-left" onClick={prevWeek}/>
        <Button iconBefore="angle-right" onClick={nextWeek}/>
      </div>
      
    </div>
  );
};
