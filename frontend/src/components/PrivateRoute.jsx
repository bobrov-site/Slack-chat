import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { appPaths } from '../routes';

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.app);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(appPaths.login());
    }
  }, [token, navigate]);

  return token ? children : null;
};

export default PrivateRoute;
