import { Formik, Form, Field } from 'formik';
// import Form from 'react-bootstrap/Form';
const nicknameId = 'nickname';
const passwordId = 'password';
const Login = () => (
  <Formik
    initialValues={{ nickname: '', password: '' }}
    onSubmit={({ setSubmitting }) => {
      console.log('Form is validated! Submitting the form...');
      setSubmitting(false);
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
);

export default Login;
