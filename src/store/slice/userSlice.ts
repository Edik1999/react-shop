import {createSlice} from '@reduxjs/toolkit'

interface IUser {
    email: string,
    name: string,
    phone: string,
    address: string,
    sub: string,
    picture: string,
}

const initial: [IUser] = [{
    email: '',
    name: '',
    phone: '',
    address: '',
    sub: '',
    picture: '',
}];

export const userSlice = createSlice({
    name: 'user',
    initialState: initial,
    reducers: {
        setUserData: (state, action) => action.payload,
        updateUserData: (state, action) => [{...state[0], ...action.payload[0]}],
    },
})

export const { setUserData, updateUserData } = userSlice.actions

export default userSlice.reducer