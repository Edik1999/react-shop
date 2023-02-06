import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { IGoods} from '../../models/models'

type state = any[]

const initialState: state = []

export const goodsSlice = createSlice({
  name: 'setGoods',
  initialState,
  reducers: {
    setGoods: (state, action) => {action.payload.map((el: any) => {
      state.push(el)
      return
    })},
    // filterGoods: (state, action) => {return state.filter(el)}
  },
})

// Action creators are generated for each case reducer function
export const { setGoods } = goodsSlice.actions

export default goodsSlice.reducer