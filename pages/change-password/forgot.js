import { useState } from 'react';
import axios from 'axios';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import Splash from '../../components/Splash';
import CircleSpinner from '../../components/CircleSpinner';
import Alert from '../../components/Alert';

const ForgotPassword = () => {
  const [status, setStatus] = useState('default');

  const handleSubmit = async ({ email }) => {
    try {
      setStatus('sending');
      await axios.post('/api/user/change-password/request', { email });
      setStatus('sent');
    } catch (error) {
      setStatus('invalid');
      console.log('ERROR', { error });
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

  const alert = () => null;

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
      useGlassmorphicBox={status === 'verified'}
    >
      {innards()}
    </Splash>
  );
};

export default ForgotPassword;
