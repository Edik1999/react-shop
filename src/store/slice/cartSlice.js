import { createSlice } from '@reduxjs/toolkit'

let initial = [];

if (localStorage.getItem('cart')) initial = JSON.parse(localStorage.getItem('cart'))

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initial,
  reducers: {
    cart: (state, action) => [...state, {id: action.payload, count: 1}],
    deleteFromCart: (state, action) => state.filter(el => el.id !== action.payload),
    deleteSingleGood: (state, action) => state.map(elem => (elem.id === action.payload ? {...elem, count: elem.count - 1} : elem)),
    addSingleGood: (state, action) => state.map(elem => (elem.id === action.payload ? {...elem, count: elem.count + 1} : elem)),
  },
})

export const { deleteFromCart, cart, deleteSingleGood, addSingleGood } = cartSlice.actions

export default cartSlice.reducer