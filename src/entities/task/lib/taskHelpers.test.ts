import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  convertFormToTask,
  convertTaskToForm,
  convertDndToTask,
  convertResizeToTask,
  getWeekdaysWithTasks,
} from './taskHelpers'
import * as timeHelpers from '@shared/lib/time'

// Common mocks for all tests
vi.mock('@shared/config/calendar', () => ({
  TIMES_WITH_HALF: ['09:00', '09:30', '10:00'],
}))

vi.mock('@shared/config/dayjs', () => ({
  default: () => ({
    format: (formatStr: string) => {
      if (formatStr === 'd') return '1'
      if (formatStr === 'HH:mm') return '10:00'
      return ''
    },
  }),
}))

const createMockTask = (overrides = {}) => ({
  id: '1',
  assignerId: null,
  assigneeId: null,
  projectId: '123456',
  sectionId: null,
  parentId: null,
  order: 1,
  content: 'Test task',
  description: '',
  isCompleted: false,
  labels: [],
  priority: 1,
  commentCount: 0,
  createdAt: '',
  creatorId: '',
  url: '',
  due: null,
  duration: null,
  deadline: null,
  ...overrides,
})

describe('taskHelpers', () => {
  describe('convertFormToTask', () => {
    beforeEach(() => {
      vi.spyOn(timeHelpers, 'getDueString').mockReturnValue(
        '2024-04-12 в 10:00'
      )
      vi.spyOn(timeHelpers, 'getDuration').mockReturnValue(60)
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should return an object with dueString if timeEnd is not specified', () => {
      const form = { content: 'Task', date: '2024-04-12', timeStart: '10:00' }
      const result = convertFormToTask(form)

      expect(result.dueString).toBe('2024-04-12 в 10:00')
      expect(result.content).toBe('Task')
      expect(result).not.toHaveProperty('duration')
    })

    it('should add duration if timeEnd is specified', () => {
      const form = {
        content: 'Task',
        date: '2024-04-12',
        timeStart: '10:00',
        timeEnd: '11:00',
      }
      const result = convertFormToTask(form)

      expect(result.dueString).toBe('2024-04-12 в 10:00')
      expect(result.duration).toBe(60)
      expect(result.durationUnit).toBe('minute')
    })
  })

  describe('convertTaskToForm', () => {
    beforeEach(() => {
      vi.spyOn(timeHelpers, 'getTimeByString').mockReturnValue('10:00')
      vi.spyOn(timeHelpers, 'getTimeByDuration').mockReturnValue('11:00')
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should correctly convert Task to ITaskForm', () => {
      const task = createMockTask({
        content: 'Task with date',
        due: {
          date: '2024-04-12',
          datetime: '2024-04-12T10:00:00Z',
          isRecurring: false,
          string: '2024-04-12',
        },
        duration: { amount: 60, unit: 'minute' },
      })

      const result = convertTaskToForm(task)

      expect(result.content).toBe('Task with date')
      expect(result.date).toBe('2024-04-12')
      expect(result.timeStart).toBe('10:00')
      expect(result.timeEnd).toBe('11:00')
    })
  })

  describe('convertDndToTask', () => {
    beforeEach(() => {
      vi.spyOn(timeHelpers, 'getDueString').mockImplementation(
        (date, time) => `${date} в ${time || ''}`
      )
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should correctly convert droppableId to dueString', () => {
      const result = convertDndToTask('123', '2024-04-12_10:00')

      expect(result.id).toBe('123')
      expect(result.data.dueString).toBe('2024-04-12 в 10:00')
    })
  })

  describe('convertResizeToTask', () => {
    it('should set the correct duration', () => {
      const task = createMockTask()
      const result = convertResizeToTask(90, task)

      expect(result.id).toBe('1')
      expect(result.data.duration).toBe(90)
      expect(result.data.durationUnit).toBe('minute')
    })
  })

  describe('getWeekdaysWithTasks', () => {
    it('should return the structure of weekdays', () => {
      const result = getWeekdaysWithTasks([])

      expect(result.noDate).toEqual([])
      expect(result.days.length).toBe(7)
    })

    it('should place tasks without a date into noDate', () => {
      const tasks = [
        createMockTask({ id: '1', content: 'Task 1' }),
        createMockTask({ id: '2', content: 'Task 2' }),
      ]

      const result = getWeekdaysWithTasks(tasks)

      expect(result.noDate.length).toBe(2)
    })
  })
})
