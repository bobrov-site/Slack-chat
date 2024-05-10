import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import socket from './socket';
import { useGetMessagesQuery } from './slices/messagesSlice';
import { useGetChannelsQuery } from './slices/channelsSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/Signup';
import Header from './components/Header';

const App = () => {
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_TOKEN_ACCESS,
    environment: 'production',
  };
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
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
