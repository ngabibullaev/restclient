import { configureStore } from '@reduxjs/toolkit'
import logic from './Logic/logicSlice'
import cart from './Logic/cartSlice'

export const store = configureStore({
  reducer: {
    logic,
    cart,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch