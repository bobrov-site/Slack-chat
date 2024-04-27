import { combineReducers } from '@reduxjs/toolkit';
import authReducer, { actions as authActions } from './authSlice.js';

export const rootReducer = combineReducers({
  auth: authReducer,
});

export const actions = {
  ...authActions,
};
