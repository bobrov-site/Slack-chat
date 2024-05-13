import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import filter from 'leo-profanity';
import store from './slices';
import App from './App';
import { useGetMessagesQuery } from './slices/messagesSlice';
import { useGetChannelsQuery } from './slices/channelsSlice';
import socket from './socket';
import resources from './locales';

const Init = async () => {
  const { refetch: refetchMessages } = useGetMessagesQuery();
  const { refetch: refetchChannels } = useGetChannelsQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      dispatch({ type: 'addMessage', payload: newMessage });
      refetchMessages();
    };
    const handleNewChannel = (channel) => {
      dispatch({ type: 'addChannel', payload: channel });
      refetchChannels();
    };
    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);
    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
    };
  }, [refetchMessages, refetchChannels, dispatch]);
  i18next.init({
    lng: 'ru',
    resources,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });
  filter.loadDictionary('ru');
  filter.loadDictionary('en');
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <div className="h-100 d-flex flex-column justify-content-between">
          <App />
        </div>
      </I18nextProvider>
    </Provider>
  );
};

export default Init;
