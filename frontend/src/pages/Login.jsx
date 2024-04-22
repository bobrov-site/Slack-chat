import { Formik, Form, Field } from 'formik';
// import Form from 'react-bootstrap/Form';

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
        <label htmlFor="nickname">Никнейм</label>
        <Field
          type="text"
          name="nickname"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Пароль</label>
        <Field
          type="password"
          name="password"
          className="form-control"
        />
      </div>
      <button type="submit">Войти</button>
    </Form>
  </Formik>
);

export default Login;
