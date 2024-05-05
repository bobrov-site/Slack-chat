import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: '1',
  currentChannelName: 'general',
  showModal: false,
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
    setShowModal: (state, action) => {
      state.showModal = action.payload;
      console.log(state.showModal);
    },
  },
});

export const { changeChannel, setShowModal } = appSlice.actions;
export default appSlice.reducer;
