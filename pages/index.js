import { useState } from 'react';
import { Row, Col, Button, Collapse } from 'react-bootstrap';
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

const Home = ({ currentUser }) => {
  const [newUsersOpen, setNewUsersOpen] = useState(false);

  return (
    <Layout pageTitle="Home" currentUser={currentUser}>
      <Row>
        <Col md={{ span: 4, order: 'last' }}>
          <h4 className="mb-3">New users</h4>
          <Button
            onClick={() => setNewUsersOpen(!newUsersOpen)}
            aria-expanded={newUsersOpen}
            aria-controls="collapse-new-users"
          >
            SHOW
          </Button>
          <Collapse in={newUsersOpen}>
            <div id="collapse-new-users">
              <NewUsers />
            </div>
          </Collapse>
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
};

export default Home;
