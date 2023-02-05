import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {IGoods} from '../../models/models'

const initialState: IGoods = {
    id: '',
    title: '',
    image: '',
    price: '',
    text: ''
}

export const goodsSlice = createSlice({
  name: 'setGoods',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<IGoods>) => {
      console.log(state)
      console.log(action)
    },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { set } = goodsSlice.actions

export default goodsSlice.reducer