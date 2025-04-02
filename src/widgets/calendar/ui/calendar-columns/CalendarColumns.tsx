import { FC, useMemo } from 'react';
import './CalendarColumns.css'
import { CalendarColumnTime } from '../calendar-column-time/CalendarColumnTime';
import { convertAndGroupTasks, useTasks } from '@entities/task';
import { CalendarColumn } from '../calendar-column/CalendarColumn';
import { useCalendarStore } from '../../model/calendarStore';
import { getWeekFilter } from '../../model/calendarHelpers';
import { useCalendarDimensions } from '../../hooks/useCalendarDimensions';
import { useWeekDays } from '../../hooks/useWeekDays';
import clsx from 'clsx';

export const CalendarColumns: FC = () => {
  const { startDate } = useCalendarStore()
  
  const filter = useMemo(() => getWeekFilter(startDate), [startDate])
  const { data, isLoading  } = useTasks(filter)

  const { dimensions, timeRef, columnRef } = useCalendarDimensions()
  const weekDays = useWeekDays(startDate)

  const tasks = useMemo(() => data?.results || [], [data])
  const days = useMemo(() => convertAndGroupTasks(tasks, dimensions), [tasks, dimensions])

  return (
    <div className="calendar-columns">
      <div className={clsx("calendar-columns__loader", isLoading && "_active")}></div>

      <CalendarColumnTime timeRef={timeRef}/>

      {days.map((tasks, idx) => (
        <CalendarColumn
          key={idx}
          tasks={tasks}
          date={weekDays[idx].format("YYYY-MM-DD")}
          dimensions={dimensions}
          columnRef={columnRef}
        />
      ))}
    </div>
  );
};
