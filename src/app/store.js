import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../helpers/userSlice';
import usersSlice from '../helpers/usersSlice';
import appointmentsSlice from '../helpers/appointmentsSlice';
import appointmentSlice from '../helpers/appointmentSlice';

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import thunk from 'redux-thunk';

const reducers = combineReducers({
    user: userSlice,
    users: usersSlice,
    appointment: appointmentSlice,
    appointments: appointmentsSlice
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);


export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});