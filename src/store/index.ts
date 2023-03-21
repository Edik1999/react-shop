import { configureStore } from "@reduxjs/toolkit";
import goodsSlice from "./slice/goodsSlice";
import { mockAPI } from "./mockAPI/mockApi";
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import cartSlice from "./slice/cartSlice";

export const store = configureStore({
    reducer: {
        [mockAPI.reducerPath]: mockAPI.reducer,
        goods: goodsSlice,
        cart: cartSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(mockAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch