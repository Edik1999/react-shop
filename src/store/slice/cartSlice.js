import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

const initial = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initial,
  reducers: {
    cart: (state, action) => {state.push(action.payload)},
    deleteFromCart: (state, action) => {return state.filter(el => el.id !== action.payload)},
    deleteSingleGood: (state, action) => {return state.filter((el, index) => index !== action.payload)},
    addSingleGood: (state, action) => {state.push(state[action.payload])},
  },
})

export const { deleteFromCart, cart, deleteSingleGood, addSingleGood } = cartSlice.actions

export default cartSlice.reducer