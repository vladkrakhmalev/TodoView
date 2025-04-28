import { Calendar } from "@widgets/calendar"
import { Sidebar } from "@widgets/sidebar"
const CalendarPage = () => {
  return (
    <Calendar
      sidebar={<Sidebar/>}
    />
  )
}

export default CalendarPage