import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from '../features/notifications/notificationsSlice';
import { apiSlice } from '../features/api/apiSlice';

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

window.store = store;

export default store;
