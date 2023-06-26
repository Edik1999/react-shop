import { createSlice } from '@reduxjs/toolkit'

let initial: string | null = 'en';

if (localStorage.getItem('lang')) initial = localStorage.getItem('lang')

export const langSlice = createSlice({
    name: 'lang',
    initialState: initial,
    reducers: {
        setLang: (state, action) => action.payload
    },
})

export const { setLang } = langSlice.actions

export default langSlice.reducer