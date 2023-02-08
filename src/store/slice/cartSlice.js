import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

const initial = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initial,
  reducers: {
    addToCart: (state, action) => {state.push(action.payload)},
  //   incrementByAmount: (state, action: PayloadAction<number>) => {
  //     state.value += action.payload
  //   },
  },
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer