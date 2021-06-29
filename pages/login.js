import Splash from '../components/Splash';
import { Form, Button } from 'react-bootstrap';
import styles from './login.module.css';

const Login = () => {
  return (
    <Splash pageTitle="Log In">
      <div className={styles.form}>
        <h1 className="logo text-center">socialize</h1>
        <Form className="mt-5">
          <Form.Group controlId="username" className="mb-2">
            <Form.Label>
              <small>Username</small>
            </Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>
              <small>Password</small>
            </Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button
            type="submit"
            variant="outline-dark"
            className={styles.button}
          >
            Log in
          </Button>
        </Form>
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
