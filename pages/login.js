import Splash from '../components/Splash';
import { Form } from 'react-bootstrap';

const Login = () => {
  return (
    <Splash pageTitle="Log In">
      <h1 className="logo">socialize</h1>
      <Form>
        <Form.Text>Login and stuff here</Form.Text>
      </Form>
    </Splash>
  );
};

export default Login;
