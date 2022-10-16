import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { unstable_getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { authOptions } from './api/auth/[...nextauth]';
import Alert from '../components/Alert';
import Splash from '../components/Splash';
import CircleSpinner from '../components/CircleSpinner';

export async function getServerSideProps({ query, req, res }) {
  const { callbackUrl } = query;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session)
    return {
      redirect: {
        destination: callbackUrl || '/',
        permanent: false,
      },
    };

  return {
    props: {
      callbackUrl: callbackUrl || null,
    },
  };
}

const Login = ({ callbackUrl }) => {
  const router = useRouter();

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async ({ username, password }) => {
    setIsLoggingIn(true);
    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
      setIsLoggingIn(false);
    } else {
      router.push(callbackUrl || '/');
    }
  };

  const validationSchema = yup.object().shape({
    username: yup.string().label('Username').required(),
    password: yup.string().label('Password').min(8).max(40).required(),
  });

  const errorMsg = () => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Your credentials were invalid! Please try again.';
      default:
        return 'There was an error logging in! Please try again.';
    }
  };

  return (
    <Splash
      pageTitle="Log in"
      useGlassmorphicBox={!isLoggingIn}
      withPrivacyPolicy={!isLoggingIn}
    >
      {isLoggingIn ? (
        <CircleSpinner size="70" />
      ) : (
        <div className="auth-form">
          <h1 className="logo text-center mb-5">socialize</h1>
          {error && (
            <Alert type="error">
              <p className="mb-0">{errorMsg()}</p>
            </Alert>
          )}
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

          <div className="text-center my-2">
            <Link href="/change-password/forgot" passHref>
              <a className="small text-dark">Forgot your password?</a>
            </Link>
          </div>

          <Link href="/api/auth/facebook" passHref>
            <Button variant="outline-dark" className="mt-4 auth-button" as="a">
              Log in with Facebook
            </Button>
          </Link>
          <Button
            variant="outline-dark"
            className="mt-2 auth-button"
            onClick={() => handleLogin({ username: 'example' })}
          >
            Log in as Example User
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
