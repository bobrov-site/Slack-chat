import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { actions } from '../slices';
import routes from '../routes';

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFormSubmit = async (values, { setErrors }) => {
    const { nickname, password } = values;
    const data = {
      username: nickname,
      password,
    };
    try {
      const response = await axios.post(routes.login(), data, axiosConfig);
      localStorage.setItem('token', response.data.token);
      dispatch(actions.setUserData({ nickname, token: response.data.token }));
      return navigate('/');
    } catch (e) {
      setErrors({ nickname: 'Неверные имя пользователя или пароль', password: 'Неверные имя пользователя или пароль' });
      return null;
    }
  };
  return (
    (
      <Container>
        <Row className="justify-content-center">
          <Col xs="12" md="8" xxl="6">
            <Card className="shadow-sm">
              <Card.Body className="row">
                <Col xs="12" md="6">
                  {/* TODO допилить изображение */}
                  <Image src="#" alt="главное изображение" />
                </Col>
                <Col xs="12" md="6">
                  <Formik
                    initialValues={{ nickname: '', password: '' }}
                    onSubmit={handleFormSubmit}
                  >
                    {({ handleSubmit, handleChange, values, errors }) => (
                      <Form onSubmit={handleSubmit} className="form">
                        <h1>Войти</h1>
                        <Form.Group className="mb-3">
                          <Form.Label>Никнейм</Form.Label>
                          <Form.Control value={values.nickname} onChange={handleChange} type="text" name="nickname" isInvalid={!!errors.nickname} />
                        </Form.Group>
                        <Form.Group className="mb-3 position-relative">
                          <Form.Label>Пароль</Form.Label>
                          <Form.Control value={values.password} onChange={handleChange} type="password" name="password" isInvalid={!!errors.password} />
                          <Form.Control.Feedback type="invalid" tooltip>{errors.nickname}</Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" className="w-100" variant="outline-primary">Войти</Button>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>Нет аккаунта?</span>
                  <Link to="/signup">Регистрация</Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Login;
