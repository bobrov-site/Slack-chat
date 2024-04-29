import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Plus, Send } from 'react-bootstrap-icons';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik } from 'formik';
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
        <Col xs="4" md="2" className="border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <Button size="sm" variant="outline-primary">
              <Plus />
            </Button>
          </div>
          <Nav className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            <Nav.Item>
              <Button type="button" className="w-100 text-start rounded-0" variant="secondary">#general</Button>
            </Nav.Item>
            <Nav.Item>
              <Button type="button" className="w-100 text-start rounded-0" variant="light">#random</Button>
            </Nav.Item>
            <Nav.Item>
              <Button type="button" className="w-100 text-start rounded-0" variant="light">#fdsfd</Button>
            </Nav.Item>
          </Nav>
        </Col>
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
