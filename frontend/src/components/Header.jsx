import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setUserData } from '../store/slices/appSlice';
import useAuth from '../hooks';

const Header = () => {
  const dispatch = useDispatch();
  const { logOut } = useAuth();
  const { t } = useTranslation();
  const app = useSelector((state) => state.app);
  const logOutUser = () => {
    logOut();
    dispatch(setUserData({ nickname: '', token: null }));
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-2">
      <Container>
        <Navbar.Brand>
          <Link className="text-decoration-none text-black" to="/">Hexlet Chat</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {app.token ? (
              <Button onClick={() => logOutUser()} variant="primary">{t('header.logout')}</Button>
            ) : (
              ''
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
