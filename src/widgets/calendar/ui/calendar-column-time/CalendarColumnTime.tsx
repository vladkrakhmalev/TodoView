import { FC, useMemo } from 'react';
import './CalendarColumnTime.css'
import { CELL_HEIGHT, FIRST_COLUMN_WIDTH, TIMES } from '@shared/config/calendar';

export const CalendarColumnTime: FC = () => {

  const style = useMemo(() => {
    return {height: `${CELL_HEIGHT * 2}px`}
  }, [])

  return (
    <div className="calendar-column-time" style={{width: `${FIRST_COLUMN_WIDTH}px`}}>
      {TIMES.map(time =>
        <p key={time} style={style} className="calendar-column-time__item">
          {time}
        </p>
      )}
    </div>
  );
};
