import { configureStore } from "@reduxjs/toolkit";
import { mockAPI } from "./mockAPI/mockApi";

export const store = configureStore({
    reducer: {
        [mockAPI.reducerPath]: mockAPI.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(mockAPI.middleware)
})