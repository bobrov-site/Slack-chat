import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: '1',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
  },
});

export default appSlice.reducer;
