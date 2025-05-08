import { describe, it, expect } from 'vitest'
import {
  getDuration,
  getDueString,
  getTimeByString,
  getTimeByDuration,
  getTimeDiapason,
} from './timeHelpers'

describe('timeHelpers', () => {
  describe('getDuration', () => {
    it('should return 0 if timeStart or timeEnd is not provided', () => {
      expect(getDuration()).toBe(0)
      expect(getDuration('10:00')).toBe(0)
      expect(getDuration(undefined, '11:00')).toBe(0)
    })

    it('should calculate duration correctly within the same day', () => {
      expect(getDuration('10:00', '11:00')).toBe(60)
      expect(getDuration('10:00', '10:30')).toBe(30)
      expect(getDuration('10:00', '12:30')).toBe(150)
    })

    it('should calculate duration correctly when crossing midnight', () => {
      expect(getDuration('23:00', '01:00')).toBe(120)
      expect(getDuration('23:30', '00:30')).toBe(60)
    })

    it('should handle invalid time formats', () => {
      expect(getDuration('invalid', '10:00')).toBe(0)
      expect(getDuration('10:00', 'invalid')).toBe(0)
    })
  })

  describe('getDueString', () => {
    it('should return empty string if no date or time provided', () => {
      expect(getDueString()).toBe('')
      expect(getDueString('')).toBe('')
      expect(getDueString(undefined, '')).toBe('')
    })

    it('should return only date if no time provided', () => {
      expect(getDueString('2024-04-11')).toBe('2024-04-11')
      expect(getDueString('2024/04/11')).toBe('2024/04/11')
    })

    it('should return date and time if both provided', () => {
      expect(getDueString('2024-04-11', '10:00')).toBe('2024-04-11 в 10:00')
      expect(getDueString('2024/04/11', '10:00')).toBe('2024/04/11 в 10:00')
    })

    it('should handle different date formats', () => {
      expect(getDueString('11.04.2024', '10:00')).toBe('11.04.2024 в 10:00')
      expect(getDueString('11-04-2024', '10:00')).toBe('11-04-2024 в 10:00')
    })
  })

  describe('getTimeByString', () => {
    it('should return empty string if dateStr is not provided', () => {
      expect(getTimeByString()).toBe('')
      expect(getTimeByString(null)).toBe('')
      expect(getTimeByString('')).toBe('')
    })

    it('should return time in HH:mm format for UTC dates', () => {
      expect(getTimeByString('2024-04-11T10:00:00Z')).toBe('10:00')
      expect(getTimeByString('2024-04-11T15:30:00Z')).toBe('15:30')
    })

    it('should handle invalid date strings', () => {
      expect(getTimeByString('invalid')).toBe('')
      expect(getTimeByString('2024-13-45')).toBe('')
    })
  })

  describe('getTimeByDuration', () => {
    it('should return empty string if dateStr or duration is not provided', () => {
      expect(getTimeByDuration()).toBe('')
      expect(getTimeByDuration('2024-04-11T10:00:00Z')).toBe('')
      expect(getTimeByDuration(undefined, 30)).toBe('')
    })

    it('should add duration to time correctly within the same day', () => {
      expect(getTimeByDuration('2024-04-11T10:00:00Z', 30)).toBe('10:30')
      expect(getTimeByDuration('2024-04-11T10:00:00Z', 60)).toBe('11:00')
    })

    it('should handle crossing midnight', () => {
      expect(getTimeByDuration('2024-04-11T23:30:00Z', 60)).toBe('00:30')
      expect(getTimeByDuration('2024-04-11T23:45:00Z', 30)).toBe('00:15')
    })

    it('should handle negative duration', () => {
      expect(getTimeByDuration('2024-04-11T10:30:00Z', -30)).toBe('10:00')
      expect(getTimeByDuration('2024-04-11T00:30:00Z', -60)).toBe('23:30')
    })

    it('should handle invalid inputs', () => {
      expect(getTimeByDuration('invalid', 30)).toBe('')
      expect(getTimeByDuration('2024-04-11T10:00:00Z', NaN)).toBe('')
    })
  })

  describe('getTimeDiapason', () => {
    it('should return empty string if dateStr is not provided', () => {
      expect(getTimeDiapason()).toBe('')
      expect(getTimeDiapason(null)).toBe('')
      expect(getTimeDiapason('')).toBe('')
    })

    it('should return only start time if duration is not provided', () => {
      expect(getTimeDiapason('2024-04-11T10:00:00Z')).toBe('10:00')
      expect(getTimeDiapason('2024-04-11T15:30:00Z')).toBe('15:30')
    })

    it('should return time range when both date and duration are provided', () => {
      expect(getTimeDiapason('2024-04-11T10:00:00Z', 30)).toBe('10:00 - 10:30')
      expect(getTimeDiapason('2024-04-11T10:00:00Z', 60)).toBe('10:00 - 11:00')
    })

    it('should handle crossing midnight in time range', () => {
      expect(getTimeDiapason('2024-04-11T23:30:00Z', 60)).toBe('23:30 - 00:30')
      expect(getTimeDiapason('2024-04-11T23:45:00Z', 30)).toBe('23:45 - 00:15')
    })

    it('should handle invalid inputs', () => {
      expect(getTimeDiapason('invalid', 30)).toBe('')
      expect(getTimeDiapason('2024-04-11T10:00:00Z', NaN)).toBe('10:00')
    })
  })
})
