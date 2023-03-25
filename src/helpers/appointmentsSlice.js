import { createSlice } from '@reduxjs/toolkit';

export const appointmentsSlice = createSlice({
    name:'appointments',
    initialState:{
        appointments: [],
        selected: {}
    },
    reducers: {
        setAppointments: (state, action) => {
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
        },
        deleteAll: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
});

//export actions

export const { setAppointments, addSelected, deleteAll } = appointmentsSlice.actions;
export const appointmentsData= (state) => state.appointments;
export default appointmentsSlice.reducer;