import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import routes from '../routes';
// import Form from 'react-bootstrap/Form';
const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};
const Login = () => {
  const navigate = useNavigate();
  const nicknameId = 'nickname';
  const passwordId = 'password';
  return (
    (
      <Formik
        initialValues={{ nickname: '', password: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          const { nickname, password } = values;
          setSubmitting(false);
          try {
            const response = await axios.post(routes.login(), { username: nickname, password }, axiosConfig);
            // response.data.token response.data.user;
            localStorage.setItem('token', response.data.token);
            return navigate('/');
          } catch (e) {
            const { message } = e.response.data;
          }
        }}
      >
        <Form>
          <div className="form-group">
            <label htmlFor={nicknameId}>Никнейм</label>
            <Field
              type="text"
              name="nickname"
              className="form-control"
              id={nicknameId}
            />
          </div>
          <div className="form-group">
            <label htmlFor={passwordId}>Пароль</label>
            <Field
              type="password"
              name="password"
              className="form-control"
              id={passwordId}
            />
          </div>
          <button type="submit">Войти</button>
        </Form>
      </Formik>
    )
  );
};

export default Login;
