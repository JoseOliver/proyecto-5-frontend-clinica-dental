import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../helpers/userSlice';
import usersSlice from '../helpers/usersSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        users: usersSlice
    }
});