import { configureStore } from "@reduxjs/toolkit";
import { mockAPI } from "./mockAPI/mockApi";

export const store = configureStore({
    reducer: {
        [mockAPI.reducerPath]: mockAPI.reducer
    }
})