import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { IGoods} from '../../models/models'

type state = any[]

const initialState: state = []

export const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    goods: (state, action) => action.payload
  },
})

// Action creators are generated for each case reducer function
export const { goods } = goodsSlice.actions

export default goodsSlice.reducer