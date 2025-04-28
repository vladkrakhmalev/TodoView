import { FC, ReactNode } from "react"
import "./Calendar.css"
import { CalendarHeader } from "../calendar-header";
import { CalendarWeekDays } from "../calendar-week-days/CalendarWeekDays";
import { CalendarColumns } from "../calendar-columns/CalendarColumns";

interface IProps {
  sidebar?: ReactNode
}

export const Calendar: FC<IProps> = ({ sidebar }) => {
  return (
    <div className="calendar">
      <CalendarHeader/>
      <CalendarWeekDays sidebar={sidebar}/>
      <CalendarColumns/>
    </div>
  )
}