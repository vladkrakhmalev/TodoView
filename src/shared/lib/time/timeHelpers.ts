import dayjs from "@shared/config/dayjs";

export const getDuration = (timeStart?: string, timeEnd?: string): number => {
  if (!timeStart || !timeEnd) return 0
  
  const [hourStart, minuteStart] = timeStart.split(':').map(Number)
  const [hourEnd, minuteEnd] = timeEnd.split(':').map(Number)
  
  if (isNaN(hourStart) || isNaN(minuteStart) || isNaN(hourEnd) || isNaN(minuteEnd)) {
    return 0
  }

  let duration = (hourEnd - hourStart) * 60 + (minuteEnd - minuteStart)
  
  // Если время переходит через полночь
  if (duration < 0) {
    duration += 24 * 60
  }
  
  return duration
}

export const getDueString = (date?: string, time?: string): string => {
  if (!date && !time) return ''
  if (!date) return ''
  
  let dueString = date
  if (time) {
    dueString += ` в ${time}`
  }
  
  return dueString
}

export const getTimeByString = (dateStr?: string | null): string => {
  if (!dateStr) return ''
  
  try {
    // Проверяем, является ли строка валидной датой
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})?$/.test(dateStr)) {
      return ''
    }

    // Парсим дату в UTC
    const date = dayjs.utc(dateStr)
    if (!date.isValid()) return ''
    
    return date.format('HH:mm')
  } catch {
    return ''
  }
}

export const getTimeByDuration = (dateStr?: string | null, duration?: number): string => {
  if (!dateStr || duration === undefined || isNaN(duration)) return ''
  
  try {
    // Проверяем, является ли строка валидной датой
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})?$/.test(dateStr)) {
      return ''
    }

    // Парсим дату в UTC
    const date = dayjs.utc(dateStr)
    if (!date.isValid()) return ''
    
    return date.add(duration, 'minute').format('HH:mm')
  } catch {
    return ''
  }
}