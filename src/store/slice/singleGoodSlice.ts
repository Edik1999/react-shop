import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { IGoods} from '../../models/models'

type state = any[]

const initialState: state = []

export const singleGoodSlice = createSlice({
  name: 'setSingleGood',
  initialState,
  reducers: {
    setSingleGood: (state, action) => action.payload
  },
})

// Action creators are generated for each case reducer function
export const { setSingleGood } = singleGoodSlice.actions

export default singleGoodSlice.reducer