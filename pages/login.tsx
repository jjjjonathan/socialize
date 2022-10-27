import React, { useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { unstable_getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { authOptions } from './api/auth/[...nextauth]';
import Alert from '../components/ui/Alert';
import Splash from '../components/layout/Splash';
import CircleSpinner from '../components/spinners/CircleSpinner';

export const getServerSideProps: GetServerSideProps<{
  error?: string | null;
}> = async ({ query, req, res }) => {
  const { callbackUrl } = query;
  const error = query.error as string | undefined;

  const session = await unstable_getServerSession(req, res, authOptions);

  if (session)
    return {
      redirect: {
        destination: callbackUrl || '/',
        permanent: false,
      },
      props: {},
    };

  return {
    props: {
      error: error || null,
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Login = ({ error }: Props) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async ({
    username,
    password,
  }: {
    username?: string;
    password?: string;
  }) => {
    setIsLoggingIn(true);
    await signIn('credentials', {
      username,
      password,
    });
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
