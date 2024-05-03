import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: '1',
  currentChannelName: 'general',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeChannel: (state, action) => {
      const { name, id } = action.payload;
      state.currentChannelId = id;
      state.currentChannelName = name;
    },
  },
});

export const { changeChannel } = appSlice.actions;
export default appSlice.reducer;
