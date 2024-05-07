import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SignupSchema = Yup.object().shape({
    nickname: Yup.string().required('Обязательное поле').min(3, 'Too Short!').max(20, 'Too Long!'),
    password: Yup.string().required('Обязательное поле').min(6, 'Too  Short!'),
    passwordConfirm: Yup.string().required('Обязательное поле').oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
  });
  const handleFormSubmit = async (values) => {
    const {nickname, password} = values;
    const user = {
      username: nickname,
      password,
    };
    try {

    }
    catch(e) {
      
    }
  };
  return (
    <Container className="mb-auto mt-auto">
      <Row className="justify-content-center">
        <Col xs="12" md="8" xxl="6">
          <Card className="shadow-sm">
            <Card.Body className="row">
              <Col xs="12" md="6" className="d-flex align-items-center justify-content-center">
                <Image src="signup.jpg" alt="регистрация" />
              </Col>
              <Col xs="12" md="6">
                <Formik
                  initialValues={{ nickname: '', password: '', passwordConfirm: '' }}
                  onSubmit={handleFormSubmit}
                  validationSchema={SignupSchema}
                  validateOnChange={false}
                >
                  {({
                    handleSubmit, handleChange, values, errors,
                  }) => (
                    <Form onSubmit={handleSubmit} className="form">
                      <h1>Регистрация</h1>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="nickname">Имя пользователя</Form.Label>
                        <Form.Control id="nickname" value={values.nickname} onChange={handleChange} type="text" name="nickname" isInvalid={!!errors.nickname} />
                        <Form.Control.Feedback type="invalid">{errors.nickname}</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="password">Пароль</Form.Label>
                        <Form.Control id="password" value={values.password} onChange={handleChange} type="password" name="password" isInvalid={!!errors.password} />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="paswordConfirm">Подтвердите пароль</Form.Label>
                        <Form.Control id="paswordConfirm" value={values.passwordConfirm} onChange={handleChange} type="password" name="passwordConfirm" isInvalid={!!errors.passwordConfirm} />
                        <Form.Control.Feedback type="invalid">{errors.passwordConfirm}</Form.Control.Feedback>
                      </Form.Group>
                      <Button type="submit" className="w-100" variant="outline-primary">Зарегистрироваться</Button>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
