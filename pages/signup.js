import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import Alert from '../components/Alert';
import Splash from '../components/Splash';
import styles from './loginsignup.module.css';

const Signup = () => {
  const handleSignup = console.log;

  const validationSchema = yup.object().shape({
    name: yup.string().label('Full name').required(),
    username: yup.string().label('Username').required(),
    email: yup.string().email().label('Email address').required(),
    password: yup.string().label('Password').min(8).max(40).required(),
  });

  const alert = () => (
    <Alert type="error">There was an error! Whoopsie daisie!</Alert>
  );

  return (
    <Splash pageTitle="Sign up" useGlassmorphicBox="true">
      <div className={styles.form}>
        <h1 className="logo text-center mb-5">socialize</h1>
        {alert()}
        <Formik
          initialValues={{ name: '', username: '', email: '', password: '' }}
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
                className={styles.button}
                disabled={isSubmitting}
              >
                Sign up
              </Button>
            </FormikForm>
          )}
        </Formik>
      </div>
    </Splash>
  );
};

export default Signup;
