import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { ApiError } from '../types/misc';
import Alert from '../components/ui/Alert';
import Splash from '../components/layout/Splash';
import CircleSpinner from '../components/spinners/CircleSpinner';

const Signup = () => {
  const router = useRouter();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [apiErrors, setApiErrors] = useState<ApiError[]>([]);

  const initialValues = {
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConf: '',
  };

  const handleSignup = async (values: typeof initialValues) => {
    try {
      setApiErrors([]);
      setIsSigningUp(true);
      const { data } = await axios.post('/api/user', values);
      const uriEmail = encodeURIComponent(data.email);
      router.push(`/verify-email?email=${uriEmail}`);
    } catch (error: any) {
      setIsSigningUp(false);
      if (error?.response?.data?.errors) {
        setApiErrors(error.response.data.errors as ApiError[]);
      }
      console.error(error);
    }
  };

  const validationSchema = yup.object().shape({
    name: yup.string().label('Full name').min(2).max(50).required(),
    username: yup.string().label('Username').min(3).max(30).required(),
    email: yup
      .string()
      .email()
      .label('Email address')
      .min(5)
      .max(100)
      .required(),
    password: yup.string().label('Password').min(8).max(40).required(),
    passwordConf: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const alert = () => {
    if (apiErrors.length !== 0)
      return (
        <Alert type="error">
          <ul className="mb-0">
            {apiErrors.map((error) => (
              <li key={error.msg}>{error.msg}</li>
            ))}
          </ul>
        </Alert>
      );
    return null;
  };

  return (
    <Splash
      pageTitle="Sign up"
      useGlassmorphicBox={!isSigningUp}
      withPrivacyPolicy={!isSigningUp}
    >
      {isSigningUp ? (
        <CircleSpinner size="70" />
      ) : (
        <div className="auth-form">
          <h1 className="logo text-center mb-5">socialize</h1>
          {alert()}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
          >
            {({ isSubmitting, errors }) => (
              <FormikForm noValidate>
                <Form.Group className="mb-2" controlId="name">
                  <Form.Label className="small mb-0 ml-2">Full name</Form.Label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Firstname McLastname"
                    as={Form.Control}
                    isInvalid={!!errors.name}
                  />
                  <ErrorMessage
                    name="name"
                    component={Form.Control.Feedback}
                    type="invalid"
                  />
                </Form.Group>

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

                <Form.Group className="mb-2" controlId="email">
                  <Form.Label className="small mb-0 ml-2">
                    Email address
                  </Form.Label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="me@example.com"
                    as={Form.Control}
                    isInvalid={!!errors.email}
                  />
                  <ErrorMessage
                    name="email"
                    component={Form.Control.Feedback}
                    type="invalid"
                  />
                </Form.Group>

                <Form.Group className="mb-2" controlId="password">
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

                <Form.Group controlId="passwordConf">
                  <Form.Label className="small mb-0 ml-2">
                    Confirm Password
                  </Form.Label>
                  <Field
                    type="password"
                    name="passwordConf"
                    placeholder="Confirm Password"
                    as={Form.Control}
                    isInvalid={!!errors.passwordConf}
                  />
                  <ErrorMessage
                    name="passwordConf"
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
                  Sign up
                </Button>
              </FormikForm>
            )}
          </Formik>
        </div>
      )}
    </Splash>
  );
};

export default Signup;
