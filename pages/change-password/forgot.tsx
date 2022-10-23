import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import Splash from '../../components/layout/Splash';
import CircleSpinner from '../../components/spinners/CircleSpinner';
import Alert from '../../components/ui/Alert';

type ForgotPasswordStatus =
  | 'default'
  | 'sending'
  | 'sent'
  | 'invalid'
  | 'error';

const ForgotPassword = () => {
  const [status, setStatus] = useState<ForgotPasswordStatus>('default');

  const handleSubmit = async ({ email }: { email: string }) => {
    try {
      setStatus('sending');
      await axios.post('/api/user/change-password/request', { email });
      setStatus('sent');
    } catch (error: any) {
      if (error?.response?.data?.error === 'Email not found') {
        setStatus('invalid');
      } else {
        setStatus('error');
      }
      console.error(error);
    }
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .label('Email address')
      .min(5)
      .max(100)
      .required(),
  });

  const alert = () => {
    switch (status) {
      case 'invalid':
        return (
          <Alert type="error">
            The email address you entered does not match our records. Please try
            again.
          </Alert>
        );
      case 'error':
        return <Alert type="error">Error sending password reset email</Alert>;
      default:
        return null;
    }
  };

  const emailForm = () => (
    <div className="auth-form">
      {alert()}
      <h2>Forgot your password?</h2>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <FormikForm noValidate>
            <Form.Group className="mb-2" controlId="email">
              <Form.Label className="small mb-0 ml-2">Email address</Form.Label>
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
            <Button
              type="submit"
              variant="outline-dark"
              className="auth-button"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );

  const innards = () => {
    switch (status) {
      case 'sending':
        return <CircleSpinner size="70" />;
      case 'sent':
        return <Alert>Password reset email sent!</Alert>;
      default:
        return emailForm();
    }
  };

  return (
    <Splash
      pageTitle="Forgot Password"
      useGlassmorphicBox={status !== 'sending' && status !== 'sent'}
    >
      {innards()}
    </Splash>
  );
};

export default ForgotPassword;
