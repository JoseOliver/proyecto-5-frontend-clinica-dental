import { createSlice } from '@reduxjs/toolkit';
import * as dayjs from 'dayjs'

export const appointmentSlice = createSlice({
    name:'appointment',
    initialState:{
        appointment: {date:dayjs().format('YYYY-MM-DDThh:mm')},
    },
    reducers: {
        setNewAppointment: (state, action) => {
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

export const { setNewAppointment, addSelected, deleteAll } = appointmentSlice.actions;
export const appointmentData= (state) => state.appointment;
export default appointmentSlice.reducer;