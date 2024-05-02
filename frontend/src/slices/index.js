import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import appReducer from './appSlice.js';
import { channelsApi } from './channelsSlice.js';
import { messagesApi } from './messagesSlice.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware, messagesApi.middleware),
});
