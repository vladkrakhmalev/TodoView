import dayjs from "@shared/config/dayjs";

export const getDuration = (timeStart?: string, timeEnd?: string): number => {
  if (!timeStart || !timeEnd) return 0
  const [hourStart, minuteStart] = timeStart.split(':').map(Number)
  const [hourEnd, minuteEnd] = timeEnd.split(':').map(Number)  
  return (hourEnd - hourStart) * 60 + (minuteEnd - minuteStart)
}

export const getDueString = (date?: string, time?: string): string => {
  let dueString = ''
  if (date) dueString += date
  if (time) dueString += ` в ${time}`
  return dueString
}

export const getTimeByString = (dateStr?: string | null): string => {
  if (!dateStr) return ''
  return dayjs(dateStr).format('HH:mm')
}

export const getTimeByDuration = (dateStr?: string | null, duration?: number): string => {
  const timeStart = getTimeByString(dateStr)
  if (!timeStart || !duration) return ''
  return dayjs(dateStr).add(duration, 'minute').format('HH:mm')
}