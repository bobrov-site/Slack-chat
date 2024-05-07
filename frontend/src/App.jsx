import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import socket from './socket';
import { useGetMessagesQuery } from './slices/messagesSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/Signup';
import Header from './components/Header';

const App = () => {
  const { refetch } = useGetMessagesQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      dispatch({ type: 'addMessage', payload: newMessage });
      refetch();
    });

    return () => {
      socket.off('newMessage');
    };
  }, [refetch]);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
