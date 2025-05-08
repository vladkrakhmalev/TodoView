import { useMemo } from 'react'
import dayjs from '@shared/config/dayjs'

export const useWeekDays = (startDate: dayjs.Dayjs) => {
  return useMemo(
    () => Array.from({ length: 7 }, (_, i) => startDate.add(i, 'day')),
    [startDate]
  )
}
