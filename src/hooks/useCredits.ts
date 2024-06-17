import { create } from 'zustand'

interface State {
  credit: number
}

interface Action {
  setCredit: (credit: number) => void
}

const initialState: State = {
  credit: 0
} as const

export const useCredit = create<State & Action>()((set) => ({
  ...initialState,
  setCredit: (credit) => set(() => ({ credit }))
}))
