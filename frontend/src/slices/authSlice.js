/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') ?? null,
  username: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.nickname;
    },
  },
});

export const { setUserData } = authSlice.actions;
export default authSlice.reducer;
