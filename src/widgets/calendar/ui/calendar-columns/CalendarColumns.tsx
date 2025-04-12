import { FC, useEffect, useMemo, useRef } from 'react';
import './CalendarColumns.css'
import { CalendarColumnTime } from '../calendar-column-time/CalendarColumnTime';
import { convertAndGroupTasks, useTasks } from '@entities/task';
import { CalendarColumn } from '../calendar-column/CalendarColumn';
import { useCalendarStore } from '../../model/calendarStore';
import { getWeekFilter } from '../../model/calendarHelpers';
import { useWeekDays } from '../../hooks/useWeekDays';
import clsx from 'clsx';
import { DragTaskContext } from '@features/drag-task';
import { FIRST_COLUMN_WIDTH } from '@widgets/calendar/config';

export const CalendarColumns: FC = () => {
  const { startDate, taskHeight, taskWidth, setSize } = useCalendarStore()
  
  const filter = useMemo(() => getWeekFilter(startDate), [startDate])
  const { data, isLoading  } = useTasks(filter)

  const columnsRef = useRef<HTMLDivElement | null>(null)
  const timeRef = useRef<HTMLDivElement | null>(null)

  const weekDays = useWeekDays(startDate)

  const tasks = useMemo(() => data?.results || [], [data])
  const days = useMemo(() => convertAndGroupTasks(tasks, taskHeight, taskWidth), [tasks, taskHeight, taskWidth])

  useEffect(() => {
    if (columnsRef.current && timeRef.current) {
      setSize(
        timeRef.current.getBoundingClientRect().height,
        (columnsRef.current.getBoundingClientRect().width - FIRST_COLUMN_WIDTH) / 7,
      )
    }
  }, [columnsRef, timeRef, setSize])

  return (
    <div className="calendar-columns" ref={columnsRef}>
      <div className={clsx("calendar-columns__loader", isLoading && "_active")}></div>
      <CalendarColumnTime timeRef={timeRef}/>

      <DragTaskContext taskHeight={taskHeight} taskWidth={taskWidth}>
        {days.map((tasks, idx) => (
          <CalendarColumn
            key={idx}
            tasks={tasks}
            date={weekDays[idx].format("YYYY-MM-DD")}
          />
        ))}
      </DragTaskContext>
    </div>
  );
};
