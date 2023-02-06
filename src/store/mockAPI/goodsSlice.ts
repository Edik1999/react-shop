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
    })}
    // setGoods: (state, action: PayloadAction<any>) => state.push(action)
    // state.push(action.payload)
      // console.log(state[0].id)
      // console.log(action, 1)
      // console.log(action.payload, 2)
    
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { setGoods } = goodsSlice.actions

export default goodsSlice.reducer