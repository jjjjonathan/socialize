import { Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import Layout from '../components/Layout';
import Newsfeed from '../components/Newsfeed';
import useCurrentUser from '../hooks/useCurrentUser';

const Home = () => {
  const { currentUser } = useCurrentUser();

  return (
    <Layout pageTitle="Home">
      {currentUser ? (
        <Image
          src={currentUser.profilePicture}
          alt=""
          width="100"
          height="100"
        />
      ) : null}
      <Row>
        <Col
          md={{ span: 4, order: 'last' }}
          style={{ background: 'lightgray' }}
        >
          <h3>sidebar</h3>
        </Col>
        <Col>
          <Newsfeed
            posts={[{ user: { name: 'Jonny baby' }, body: 'idk', likes: [] }]}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default Home;
