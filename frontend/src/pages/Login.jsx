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
import { useTranslation } from 'react-i18next';
import { setUserData } from '../slices/appSlice';
import { useLoginMutation } from '../slices/authSlice';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const handleFormSubmit = async (values, { setErrors }) => {
    const { nickname, password } = values;
    const user = {
      username: nickname,
      password,
    };
    try {
      const response = await login(user);
      dispatch(setUserData({ nickname, token: response.data.token }));
      localStorage.setItem('token', response.data.token);
      return navigate('/');
    } catch (e) {
      setErrors({ password: t('form.errors.password') });
      return null;
    }
  };
  return (
    (
      <Container className="mb-auto mt-auto">
        <Row className="justify-content-center">
          <Col xs="12" md="8" xxl="6">
            <Card className="shadow-sm">
              <Card.Body className="row">
                <Col xs="12" md="6" className="d-flex align-items-center justify-content-center">
                  <Image src="login.jpeg" alt={t('loginPage.title')} />
                </Col>
                <Col xs="12" md="6">
                  <Formik
                    initialValues={{ nickname: '', password: '' }}
                    onSubmit={handleFormSubmit}
                  >
                    {({
                      handleSubmit, handleChange, values, errors,
                    }) => (
                      <Form onSubmit={handleSubmit} className="form">
                        <h1>{t('loginPage.title')}</h1>
                        <Form.Group className="mb-3">
                          <Form.Label>{t('loginPage.nickname')}</Form.Label>
                          <Form.Control value={values.nickname} onChange={handleChange} type="text" name="nickname" isInvalid={!!errors.password} />
                        </Form.Group>
                        <Form.Group className="mb-3 position-relative">
                          <Form.Label>{t('loginPage.password')}</Form.Label>
                          <Form.Control value={values.password} onChange={handleChange} type="password" name="password" isInvalid={!!errors.password} />
                          <Form.Control.Feedback type="invalid" tooltip>{errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" className="w-100" variant="outline-primary">{t('loginPage.button')}</Button>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>
                    {t('loginPage.footer.text')}
                    {' '}
                    <Link to="/signup">{t('loginPage.footer.link')}</Link>
                  </span>
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
