import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name:'user',
    initialState:{
        credenciales: {}
    },
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        logout: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
});

//export actions

export const { login, logout } = userSlice.actions;
export const userData= (state) => state.user;
export default userSlice.reducer;