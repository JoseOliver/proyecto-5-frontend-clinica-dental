import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../common/Login/userSlice';

export default configureStore({
    reducer: {
        user: userSlice
    }
});