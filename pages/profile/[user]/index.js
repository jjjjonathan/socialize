import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import Layout from '../../../components/Layout';
import Newsfeed from '../../../components/Newsfeed';

const Profile = () => {
  const router = useRouter();
  const { user } = router.query;
  return (
    <Layout pageTitle="Home">
      <h3>Jonathan Horn</h3>
      <h4>@{user}</h4>
      <Row>
        <Col md={{ span: 4 }} style={{ background: 'lightgray' }}>
          <h3>friends list, about me, links, photos?</h3>
        </Col>
        <Col>
          <Newsfeed />
        </Col>
      </Row>
    </Layout>
  );
};

export default Profile;
