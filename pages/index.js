import { Row, Col } from 'react-bootstrap';
import Layout from '../components/Layout';
import Newsfeed from '../components/Newsfeed';

const Home = () => (
  <Layout pageTitle="Home">
    <Row>
      <Col md={{ span: 4, order: 'last' }} style={{ background: 'lightgray' }}>
        <h3>sidebar</h3>
      </Col>
      <Col>
        <Newsfeed />
      </Col>
    </Row>
  </Layout>
);

export default Home;
