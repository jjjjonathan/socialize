import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import Splash from '../../components/Splash';
import CircleSpinner from '../../components/CircleSpinner';
import Alert from '../../components/Alert';

export async function getServerSideProps({ query }) {
  const { token } = query;

  return {
    props: { token },
  };
}

const ChangePassword = ({ token }) => {
  const router = useRouter();

  const [status, setStatus] = useState('default');
  const [user, setUser] = useState({});

  useEffect(async () => {
    try {
      const { data } = await axios.post(`/api/user/change-password/${token}`);
      setUser(data);
      setStatus('verified');
    } catch (error) {
      console.error(error);
      if (error.response?.data?.error === 'expired') {
        setStatus('expired');
      } else {
        setStatus('invalid');
      }
    }
  }, []);

  const handleSubmit = async ({ password, passwordConf }) => {
    try {
      // setApiErrors([]);
      await axios.post('/api/user/change-password', {
        password,
        passwordConf,
        email: user.email,
      });
      // Successful change message
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error) {
      // if (error.response?.data?.errors) {
      //   setApiErrors(error.response.data.errors);
      // }
      console.error(error);
    }
  };

  const validationSchema = yup.object().shape({
    password: yup.string().label('Password').min(8).max(40).required(),
    passwordConf: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const passwordForm = () => (
    <div className="auth-form">
      <p>Email address: {user.email}</p>
      <p>Username: {user.username}</p>
      <Formik
        initialValues={{
          password: '',
          passwordConf: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <FormikForm noValidate>
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
              Submit
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );

  const innards = () => {
    switch (status) {
      case 'verified':
        return passwordForm();
      case 'expired':
        return (
          <Alert type="error">This link has expired. Request a new one</Alert>
        );
      case 'invalid':
        return <Alert type="error">Invalid request</Alert>;
      default:
        return <CircleSpinner size="70" />;
    }
  };

  return (
    <Splash pageTitle="Verify Email" useGlassmorphicBox={status === 'verified'}>
      {innards()}
    </Splash>
  );
};

export default ChangePassword;
