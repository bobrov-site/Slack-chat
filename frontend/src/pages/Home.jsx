import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      return navigate('/login');
    }
  }, [token, navigate]);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/one">Page One</Link>
        </li>
        <li>
          <Link to="/two">Page Two</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Home;
