/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  username: '',
  currentChannelId: '1',
  currentChannelName: 'general',
  modalChannelId: '',
  modalChannelName: '',
  showModal: '',
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
    setUserData: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.nickname;
    },
    setChannelModal: (state, action) => {
      state.modalChannelId = action.payload.id;
      state.modalChannelName = action.payload.name;
      state.showModal = action.payload.modalName;
    },
  },
});

export const {
  changeChannel, setUserData, setChannelModal,
} = appSlice.actions;
export default appSlice.reducer;
