import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../helpers/userSlice';
import usersSlice from '../helpers/usersSlice';
import appointmentsSlice from '../helpers/appointmentsSlice';
import appointmentSlice from '../helpers/appointmentSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        users: usersSlice,
        appointment: appointmentSlice,
        appointments: appointmentsSlice
    }
});