import { Row, Col } from 'react-bootstrap';
import Layout from '../components/Layout';
import NewUsers from '../components/NewUsers';
import Newsfeed from '../components/Newsfeed';

const Home = () => (
  <Layout pageTitle="Home">
    <Row>
      <Col md={{ span: 4, order: 'last' }}>
        <h4 className="mb-3">New users</h4>
        <NewUsers />
      </Col>
      <Col>
        <Newsfeed
          posts={[
            {
              user: {
                name: 'Jonny baby',
                profilePicture: 'https://avatar.tobi.sh/random?size=512&',
              },
              body: 'idk',
              likes: [],
            },
          ]}
        />
      </Col>
    </Row>
  </Layout>
);

export default Home;
