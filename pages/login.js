import { useEffect } from 'react';
import axios from 'axios';
import Splash from '../components/Splash';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import useCurrentUser from '../hooks/useCurrentUser';
import styles from './login.module.css';

const Login = () => {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useCurrentUser();

  // Redirect to '/' if logged in
  useEffect(() => {
    if (currentUser) router.push('/');
  }, [currentUser]);

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password,
      });
      setCurrentUser(response.data);
      console.log('userIs');
      console.log(currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().min(8).max(40).required('Password is required'),
  });

  return (
    <Splash pageTitle="Log In">
      <div className={styles.form}>
        <h1 className="logo text-center mb-5">socialize</h1>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, errors }) => (
            <FormikForm noValidate>
              <Form.Group className="mb-2" controlId="username">
                <Form.Label>
                  <small>Username</small>
                </Form.Label>
                <Field
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  as={Form.Control}
                  isInvalid={!!errors.username}
                />
                <ErrorMessage
                  name="username"
                  component={Form.Control.Feedback}
                  type="invalid"
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>
                  <small>Password</small>
                </Form.Label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  as={Form.Control}
                  isInvalid={!!errors.password}
                />
                <ErrorMessage
                  name="password"
                  component={Form.Control.Feedback}
                  type="invalid"
                />
              </Form.Group>
              <Button
                type="submit"
                variant="outline-dark"
                className={styles.button}
                disabled={isSubmitting}
              >
                Log in
              </Button>
            </FormikForm>
          )}
        </Formik>

        <Button variant="outline-dark" className={`mt-5 ${styles.button}`}>
          Log in with Facebook
        </Button>
        <Button variant="outline-dark" className={`mt-2 ${styles.button}`}>
          Log in with Google
        </Button>
        <Button variant="outline-dark" className={`mt-2 ${styles.button}`}>
          Sign up with Email
        </Button>
      </div>
    </Splash>
  );
};

export default Login;
