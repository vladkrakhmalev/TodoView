import dayjs from "@shared/config/dayjs";

export const getWeekFilter = (startDate: dayjs.Dayjs) => {
  let str = ''
  const today = dayjs().startOf("isoWeek")
  const firstDay = startDate.subtract(1, "day").format("D MMMM");
  if (!startDate.isSame(today)) str += `срок после: ${firstDay} & `
  const lastDay = startDate.add(7, "day").format("D MMMM");
  return str + `срок до: ${lastDay}`
}