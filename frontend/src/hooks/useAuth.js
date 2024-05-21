import { useDispatch } from 'react-redux';
import { setUserData } from '../store/slices/appSlice';

const useAuth = () => {
  const dispatch = useDispatch();

  const logIn = (token, nickname) => {
    localStorage.setItem('token', token);
    localStorage.setItem('nickname', nickname);
    dispatch(setUserData({ nickname, token }));
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
    dispatch(setUserData({ nickname: '', token: null }));
  };

  return { logIn, logOut };
};

export default useAuth;
