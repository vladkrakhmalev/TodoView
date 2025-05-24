import dayjs from '@shared/config/dayjs'
import { create } from 'zustand'

interface IState {
  startDate: dayjs.Dayjs
}

interface IActions {
  prevWeek: () => void
  nextWeek: () => void
  resetWeek: () => void
}

const initialState: IState = {
  startDate: dayjs().startOf('isoWeek'),
}

export const useCalendarStore = create<IState & IActions>()(set => ({
  ...initialState,
  prevWeek: () =>
    set(state => ({ startDate: state.startDate.subtract(1, 'week') })),
  nextWeek: () => set(state => ({ startDate: state.startDate.add(1, 'week') })),
  resetWeek: () => set({ startDate: dayjs().startOf('isoWeek') }),
}))
