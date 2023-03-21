import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name:'user',
    initialState:{
        credenciales: {}
    },
    reducers: {
        login: (state, action) => {
            console.log(action.payload);
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
        },
        update: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
});

//export actions

export const { login, logout, update } = userSlice.actions;
export const userData= (state) => state.user;
export default userSlice.reducer;