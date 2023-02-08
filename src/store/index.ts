import { configureStore } from "@reduxjs/toolkit";
import goodsSlice from "./slice/goodsSlice";
import { mockAPI } from "./mockAPI/mockApi";
import { useSelector, useDispatch } from 'react-redux';
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
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch