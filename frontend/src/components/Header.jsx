import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
    dispatch(setUserData({ nickname: '', token: null }));
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-2">
      <Container>
        <Navbar.Brand href="#home">Slack Chat</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {auth.token ? (
              <Button onClick={() => logOut()} variant="primary">Выйти</Button>
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
