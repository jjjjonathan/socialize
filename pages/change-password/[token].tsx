import React, { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import Splash from '../../components/layout/Splash';
import CircleSpinner from '../../components/spinners/CircleSpinner';
import Alert from '../../components/ui/Alert';
import { ApiError } from '../../types/misc';
import { UserRes } from '../../types/records';

type ChangePasswordStatus =
  | 'default'
  | 'changing'
  | 'changed'
  | 'verified'
  | 'expired'
  | 'invalid';

export const getServerSideProps: GetServerSideProps<{
  token?: string;
}> = async ({ query }) => {
  const token = query.token as string | undefined;

  return {
    props: { token },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const ChangePassword = ({ token }: Props) => {
  const router = useRouter();

  const [status, setStatus] = useState<ChangePasswordStatus>('default');
  const [user, setUser] = useState<UserRes | null>(null);
  const [apiErrors, setApiErrors] = useState<ApiError[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(`/api/user/change-password/${token}`);
        setUser(data);
        setStatus('verified');
      } catch (error: any) {
        console.error(error);

        if (error?.response?.data?.error === 'expired') {
          setStatus('expired');
        } else {
          setStatus('invalid');
        }
      }
    })();
  }, []);

  const initialValues = {
    password: '',
    passwordConf: '',
  };

  const handleSubmit = async ({
    password,
    passwordConf,
  }: typeof initialValues) => {
    try {
      if (!user) return;
      setStatus('changing');
      setApiErrors([]);
      await axios.post('/api/user/change-password', {
        password,
        passwordConf,
        email: user.email,
      });
      setStatus('changed');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error: any) {
      setStatus('verified');
      if (error?.response?.data?.errors) {
        setApiErrors(error.response.data.errors as ApiError[]);
      }
      console.error(error);
    }
  };

  const validationSchema = yup.object().shape({
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

  const passwordForm = () => (
    <div className="auth-form">
      {alert()}
      <p className="medium">
        <strong>Email address:</strong> {user!.email}
      </p>
      <p className="medium">
        <strong>Username:</strong> {user!.username}
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <FormikForm noValidate>
            <Form.Group className="mb-2" controlId="password">
              <Form.Label className="small mb-0 ml-2">New Password</Form.Label>
              <Field
                type="password"
                name="password"
                placeholder="New Password"
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
          <Alert type="error">
            This link has expired.{' '}
            <Link href="/change-password/forgot">Request a new one</Link>
          </Alert>
        );
      case 'invalid':
        return <Alert type="error">Invalid request</Alert>;
      case 'changing':
        return <CircleSpinner size="70" />;
      case 'changed':
        return (
          <Alert>
            <p>Password successfully changed!</p>
            <p className="mb-0">Redirecting...</p>
          </Alert>
        );
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
