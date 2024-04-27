import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') ?? null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.token = action.payload.token;
      state.nickname = action.payload.nickname;
    },
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
