import { createSlice } from '@reduxjs/toolkit'

let initial = [];

if (localStorage.getItem('cart')) initial = JSON.parse(localStorage.getItem('cart') || "")

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initial,
  reducers: {
    cart: (state, action) => [...state, {id: action.payload, count: 1}],
    deleteFromCart: (state, action) => state.filter((el: { id: string; }) => el.id !== action.payload),
    deleteSingleGood: (state, action) => state.map((el: { id: string; count: number; }) => (el.id === action.payload ? {...el, count: el.count - 1} : el)),
    addSingleGood: (state, action) => state.map((el: { id: string; count: number; }) => (el.id === action.payload ? {...el, count: el.count + 1} : el)),
    clearCart: () => [],
  },
})

export const { deleteFromCart, cart, deleteSingleGood, addSingleGood, clearCart } = cartSlice.actions

export default cartSlice.reducer