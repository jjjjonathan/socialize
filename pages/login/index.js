import { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Alert from '../../components/Alert';
import Splash from '../../components/Splash';
import CircleSpinner from '../../components/CircleSpinner';
import useCurrentUser from '../../hooks/useCurrentUser';

const Login = () => {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { currentUser, setCurrentUser, isLoading } = useCurrentUser();

  // Redirect to '/' if logged in
  useEffect(() => {
    if (currentUser) router.push('/');
  }, [currentUser]);

  const handleLogin = async ({ username, password }) => {
    try {
      setIsError(false);
      setIsLoggingIn(true);
      const response = await axios.post('/api/auth/login', {
        username,
        password,
      });
      setCurrentUser(response.data);
    } catch (error) {
      setIsLoggingIn(false);
      console.error(error);
      setIsError(true);
    }
  };

  const validationSchema = yup.object().shape({
    username: yup.string().label('Username').required(),
    password: yup.string().label('Password').min(8).max(40).required(),
  });

  const alert = () =>
    isError ? (
      <Alert type="error">
        <p className="mb-0">
          There was an error logging in! Please check your credentials and try
          again.
        </p>
      </Alert>
    ) : null;

  return (
    <Splash pageTitle="Log in" useGlassmorphicBox={!isLoggingIn && !isLoading}>
      {isLoggingIn || isLoading ? (
        <CircleSpinner size="70" />
      ) : (
        <div className="auth-form">
          <h1 className="logo text-center mb-5">socialize</h1>
          {alert()}
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, errors }) => (
              <FormikForm noValidate>
                <Form.Group className="mb-2" controlId="username">
                  <Form.Label className="small mb-0 ml-2">Username</Form.Label>
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
                  <Form.Label className="small mb-0 ml-2">Password</Form.Label>
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
                  className="auth-button"
                  disabled={isSubmitting}
                >
                  Log in
                </Button>
              </FormikForm>
            )}
          </Formik>

          <Link href="/api/auth/facebook" passHref>
            <Button variant="outline-dark" className="mt-4 auth-button" as="a">
              Log in with Facebook
            </Button>
          </Link>
          <Button variant="outline-dark" className="mt-2 auth-button">
            Log in with Google
          </Button>
          <Link href="/signup" passHref>
            <Button variant="outline-dark" className="mt-2 auth-button" as="a">
              Sign up with Email
            </Button>
          </Link>
        </div>
      )}
    </Splash>
  );
};

export default Login;