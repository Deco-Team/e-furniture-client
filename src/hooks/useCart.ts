import { ICart } from '@app/(customer)/cart/cart.interface'
import { create } from 'zustand'

interface State {
  cart: ICart | null
}

interface Action {
  setCart: (cart: ICart | null) => void
  clearCart: () => void
}

const initialState: State = {
  cart: null
} as const

export const useCart = create<State & Action>()((set) => ({
  ...initialState,
  setCart: (cart) => set(() => ({ cart })),
  clearCart: () => set(() => ({ ...initialState }))
}))
