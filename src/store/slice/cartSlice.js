import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

const initial = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initial,
  reducers: {
    cart: (state, action) => {state.push(action.payload)},
    deleteFromCart: (state, action) => {
      return state.filter(el => el.id !== action.payload)
    },
  },
})

export const { deleteFromCart, cart } = cartSlice.actions

export default cartSlice.reducer