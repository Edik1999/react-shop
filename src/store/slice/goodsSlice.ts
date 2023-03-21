import { createSlice } from '@reduxjs/toolkit'

const initial: any[] = [];

export const goodsSlice = createSlice({
  name: 'goods',
  initialState: initial,
  reducers: {
    goods: (state, action) => action.payload
  },
})

export const { goods } = goodsSlice.actions

export default goodsSlice.reducer