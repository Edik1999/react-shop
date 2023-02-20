import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    goods: (state, action) => action.payload
  },
})

export const { goods } = goodsSlice.actions

export default goodsSlice.reducer