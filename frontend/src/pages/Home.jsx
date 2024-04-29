import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Send } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik } from 'formik';
import Channels from '../components/channels/Channels';

const Home = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      return navigate('/login');
    }
  }, [token, navigate]);
  return (
    <Container className="rounded shadow">
      <Row className="bg-white flex-md-row h-100">
        <Channels />
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="mb-0">
                <b># general</b>
              </p>
              <span className="text-muted">2 сообщения</span>
            </div>
            <div className="overflow-auto px-5">
              <div className="text-break mb-2">
                <b>admin</b>
                :
                hello world
              </div>
            </div>
            <div className="mt-auto py-3 px-5">
              <Formik>
                {({handleSubmit}) => (
                  <Form onSubmit={handleSubmit}>
                    <InputGroup>
                      <Form.Control />
                      <Button>
                        <Send />
                      </Button>
                    </InputGroup>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
