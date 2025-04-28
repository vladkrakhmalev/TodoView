import { FC } from 'react';
import './CalendarHeader.css'
import { useCalendarStore } from '../../model/calendarStore';
import { Button } from '@shared/ui/button';
import { Switcher } from '@shared/ui/switcher';
import { AddTaskButton } from '@features/add-task';

export const CalendarHeader: FC = () => {
  const { startDate, prevWeek, nextWeek, resetWeek } = useCalendarStore()
  const month = startDate.format("MMMM YYYY")

  return (
    <div className="calendar-header">
      <AddTaskButton/>

      <p className="calendar-header__title">{month}</p>

      <div className="calendar-header__arrows">
        <Button iconBefore="angle-left" onClick={prevWeek}/>
        <Button iconBefore="angle-right" onClick={nextWeek}/>
      </div>

      <Button iconBefore="calendar-day" onClick={resetWeek}>
        Сегодня
      </Button>

      <Switcher
        defaultValue='week'
        options={[
          { value: 'week', title: 'Неделя' },
          { value: 'month', title: 'Месяц' },
        ]}
        onChange={() => {}}
      />
    </div>
  );
};
