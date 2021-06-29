import Splash from '../components/Splash';
import { Form, Button } from 'react-bootstrap';

const Login = () => {
  return (
    <Splash pageTitle="Log In">
      <h1 className="logo">socialize</h1>
      <Form>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button type="submit">Log In</Button>
      </Form>
    </Splash>
  );
};

export default Login;
