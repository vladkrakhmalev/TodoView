import dayjs from "@shared/config/dayjs";

/**
 * Вычисляет продолжительность времени в минутах между двумя временными точками
 * @param timeStart - Время начала в формате "HH:mm" 
 * @param timeEnd - Время окончания в формате "HH:mm"
 * @returns Продолжительность в минутах. Возвращает 0 если параметры невалидны
 * @example
 * getDuration('10:00', '11:30') // returns 90
 * getDuration('23:00', '01:00') // returns 120
 */
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

/**
 * Форматирует дату и время в строку для отображения
 * @param date - Дата в любом валидном формате (YYYY-MM-DD, DD.MM.YYYY и т.д.)
 * @param time - Время в формате "HH:mm"
 * @returns Отформатированная строка вида "ДАТА в ВРЕМЯ" или только дата
 * @example
 * getDueString('2024-04-11', '10:00') // returns '2024-04-11 в 10:00'
 * getDueString('11.04.2024') // returns '11.04.2024'
 */
export const getDueString = (date?: string, time?: string): string => {
  if (!date && !time) return ''
  if (!date) return ''
  
  let dueString = date
  if (time) {
    dueString += ` в ${time}`
  }
  
  return dueString
}

/**
 * Извлекает время из строки даты в формате ISO
 * @param dateStr - Строка даты в формате ISO (YYYY-MM-DDTHH:mm:ssZ)
 * @returns Время в формате "HH:mm" или пустую строку если дата невалидна
 * @example
 * getTimeByString('2024-04-11T15:30:00Z') // returns '15:30'
 * getTimeByString('invalid') // returns ''
 */
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

/**
 * Вычисляет время окончания, добавляя длительность к начальной дате
 * @param dateStr - Строка даты начала в формате ISO (YYYY-MM-DDTHH:mm:ssZ)
 * @param duration - Длительность в минутах
 * @returns Время окончания в формате "HH:mm" или пустую строку если параметры невалидны
 * @example
 * getTimeByDuration('2024-04-11T10:00:00Z', 90) // returns '11:30'
 * getTimeByDuration('2024-04-11T23:00:00Z', 120) // returns '01:00'
 */
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

/**
 * Формирует временной диапазон в формате "HH:mm - HH:mm"
 * @param dateStr - Строка даты начала в формате ISO (YYYY-MM-DDTHH:mm:ssZ)
 * @param duration - Длительность в минутах
 * @returns Строка временного диапазона или только время начала если длительность не указана
 * @example
 * getTimeDiapason('2024-04-11T10:00:00Z', 90) // returns '10:00 - 11:30'
 * getTimeDiapason('2024-04-11T10:00:00Z') // returns '10:00'
 */
export const getTimeDiapason = (dateStr?: string | null, duration?: number): string => {
  // Проверяем, является ли строка валидной датой
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})?$/.test(dateStr || '')) {
    return ''
  }

  let resultDiapason = getTimeByString(dateStr)

  if (duration) {
    resultDiapason += ` - ${getTimeByDuration(dateStr, duration)}`
  }

  return resultDiapason
}