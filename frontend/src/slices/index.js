import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice.js';
import { channelsApi } from './channelsSlice.js';
import { messagesApi } from './messagesSlice.js';
import { authApi } from './authSlice.js';

export default configureStore({
  reducer: {
    app: appReducer,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware, messagesApi.middleware, authApi.middleware),
});
