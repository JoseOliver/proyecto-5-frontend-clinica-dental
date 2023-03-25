import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../helpers/userSlice';
import usersSlice from '../helpers/usersSlice';
import appointmentsSlice from '../helpers/appointmentsSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        users: usersSlice,
        appointments: appointmentsSlice
    }
});