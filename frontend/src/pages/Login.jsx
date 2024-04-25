import axios from 'axios';
import { Formik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import routes from '../routes';
// import Form from 'react-bootstrap/Form';
const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

// TODO
// 1. Реализуйте отправку формы с данными пользователя на сервер.
// 2. Интерфейс обработки запроса определён в файле routes.js серверной части. ✅
// 3. Полученный от сервера токен сохраняйте в localStorage. ✅
// 4. После успешной авторизации сделайте редирект на страницу с чатом (/). ✅
// 5. Обработайте ошибку авторизации показом соответствующего сообщения в форме.
// 6. Сделайте проверку существования токена в localStorage и редирект на форму входа в случае
// его отсутствия.
// 7. Форма Bootstrap
// 8. Чтобы данные об авторизации были доступны везде в приложении можно создать 
// для них отдельный слайс
const Login = () => {
  const navigate = useNavigate();
  const handleFormSubmit = async (values, { setSubmitting }) => {
    const { nickname, password } = values;
    const data = {
      username: nickname,
      password,
    };
    setSubmitting(false);
    try {
      const response = await axios.post(routes.login(), data, axiosConfig);
      // response.data.token response.data.user;
      localStorage.setItem('token', response.data.token);
      return navigate('/');
    } catch (e) {
      const { message } = e.response.data;
      console.log(message);
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
                          <Form.Control value={values.nickname} onChange={handleChange} type="text" name="nickname" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Пароль</Form.Label>
                          <Form.Control value={values.password} onChange={handleChange} type="password" name="password" />
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
