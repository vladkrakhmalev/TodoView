import { FC } from "react"
import "./Calendar.css"
import { CalendarHeader } from "../calendar-header";
import { CalendarWeekDays } from "../calendar-week-days/CalendarWeekDays";
import { CalendarColumns } from "../calendar-columns/CalendarColumns";

export const Calendar: FC = () => {
  return (
    <div className="calendar">
      <CalendarHeader/>
      <CalendarWeekDays/>
      <CalendarColumns/>
    </div>
  )
}