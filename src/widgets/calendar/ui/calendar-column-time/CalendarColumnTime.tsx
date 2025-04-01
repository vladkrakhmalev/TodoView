import { FC, RefObject } from 'react';
import './CalendarColumnTime.css'
import { FIRST_COLUMN_WIDTH, TIMES } from '../../config';

interface IProps {
  timeRef: RefObject<HTMLParagraphElement | null>
}

export const CalendarColumnTime: FC<IProps> = ({ timeRef }) => {

  return (
    <div className="calendar-column-time" style={{width: `${FIRST_COLUMN_WIDTH}px`}}>
      {TIMES.map((time, idx) =>
        <p
          key={idx}
          ref={idx === 0 ? timeRef : null}
          className="calendar-column-time__item"
        >
          {time}
        </p>
      )}
    </div>
  );
};
