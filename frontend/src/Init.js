import { Provider } from 'react-redux';
import { useEffect } from 'react';
import store from './slices';
import App from './App';
import { socket } from './socket';

const initSocket = async () => {
  try {
    socket.on('newMessage', (payload) => {
      console.log('connected');
      console.log(payload);
    });
  } catch (e) {
    console.log(e);
  }
};

const Init = () => {
  useEffect(() => {
    initSocket();
  });
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Init;
