import { Row, Col } from 'react-bootstrap';
import middleware from '../middleware';
import Layout from '../components/Layout';
import NewUsers from '../components/NewUsers';
import Newsfeed from '../components/Newsfeed';
import NewPost from '../components/NewPost';

export async function getServerSideProps({ req, res }) {
  await middleware.run(req, res);

  const reqUser = req.user;

  if (!reqUser) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const currentUser = JSON.parse(JSON.stringify(reqUser));

  return {
    props: {
      currentUser,
    },
  };
}

const Home = ({ currentUser }) => (
  <Layout pageTitle="Home" currentUser={currentUser}>
    <Row>
      <Col md={{ span: 4, order: 'last' }}>
        <h4 className="mb-3">New users</h4>
        <NewUsers />
      </Col>
      <Col>
        <NewPost />
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
