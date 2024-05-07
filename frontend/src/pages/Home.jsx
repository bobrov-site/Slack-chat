import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Channels from '../components/channels/Channels';
import Messages from '../components/messages/Messages';

const Home = () => {
  const { token } = useSelector((state) => state.app);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      return navigate('/login');
    }
    return () => {};
  }, [token, navigate]);
  return (
    <>
      <Container className="rounded shadow h-100 mb-2">
        <Row className="bg-white flex-md-row h-100">
          <Channels />
          <Messages />
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Home;
