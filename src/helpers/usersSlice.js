import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        selected: []
    },
    reducers: {
        addAll: (state, action) => {
            return {
            ...state,
            ...action.payload
            }
        },
        addSelected: (state, action) => {
            return {
            ...state,
            ...action.payload
            }
    }
    }
    
});

//exporto las ACCIONES.....
export const { addAll, addSelected } = usersSlice.actions;

export const usersData = (state) => state.users;

export default usersSlice.reducer;