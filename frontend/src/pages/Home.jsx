import { Link } from 'react-router-dom';

const Home = () => (
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

export default Home