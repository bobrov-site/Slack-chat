import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import { channelsApi } from './channelsSlice.js';
import { messagesApi } from './messagesSlice.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware, messagesApi.middleware),
});
