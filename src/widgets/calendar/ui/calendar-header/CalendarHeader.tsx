import { FC, useState } from 'react';
import './CalendarHeader.css'
import { useCalendarStore } from '../../model/calendarStore';
import { Button } from '@shared/ui/button';
import { Switcher } from '@shared/ui/switcher';
import { useTheme } from '@shared/lib/theme';
import { Modal } from '@shared/ui/modal';

export const CalendarHeader: FC = () => {
  const { startDate, prevWeek, nextWeek, resetWeek } = useCalendarStore()
  const { theme, toggleTheme } = useTheme()
  const month = startDate.format("MMMM YYYY")
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="calendar-header">
      <Button iconBefore='sidebar' onClick={() => setIsOpen(true)}/>

      <Modal isOpen={isOpen} position='left' onClose={() => setIsOpen(false)}>
        <Button
          iconBefore={theme === 'light' ? 'moon' : 'brightness'}
          onClick={toggleTheme}
        />
      </Modal>

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
      />
    </div>
  );
};
