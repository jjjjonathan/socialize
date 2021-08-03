import { useState } from 'react';
import { Row, Col, Button, Collapse } from 'react-bootstrap';
import produce from 'immer';
import middleware from '../middleware';
import useNewsfeed from '../hooks/useNewsfeed';
import Layout from '../components/Layout';
import NewUsers from '../components/NewUsers';
import PostList from '../components/PostList';
import NewPost from '../components/NewPost';
import CircleSpinner from '../components/CircleSpinner';
import FlatAlert from '../components/FlatAlert';

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
  const { newsfeed, isNewsfeedError, isNewsfeedLoading, setNewsfeed } =
    useNewsfeed();

  const topMenu = () => (
    <>
      <div className="d-md-none">
        <div className="mb-4 d-flex justify-content-around">
          <Button
            onClick={() => setNewUsersOpen(!newUsersOpen)}
            aria-expanded={newUsersOpen}
            aria-controls="collapse-new-users"
          >
            <i className="bi bi-file-earmark-person"></i>
          </Button>
          <Button>
            <i className="bi bi-file-earmark-plus-fill"></i>
          </Button>
        </div>
        <Collapse in={newUsersOpen}>
          <div id="collapse-new-users">
            <div className="mb-4 mx-5">
              <h4 className="mb-3 text-center">New users</h4>
              <NewUsers />
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );

  const sidebar = () => (
    <div className="d-none d-md-block">
      <h4 className="mb-3">New users</h4>
      <NewUsers />
    </div>
  );

  const addNewPostToFeed = (newPost) => {
    const nextState = produce(newsfeed, (draft) => {
      draft.unshift(newPost);
    });
    setNewsfeed(nextState);
  };

  const updateLikes = (postId, likes) => {
    const nextState = newsfeed.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes,
        };
      }
      return post;
    });
    setNewsfeed(nextState);
  };

  const displayNewsfeed = () => {
    if (isNewsfeedLoading)
      return (
        <div className="mt-5 d-flex justify-content-center">
          <CircleSpinner size="50" />
        </div>
      );
    if (isNewsfeedError)
      return (
        <FlatAlert type="error" className="text-center mt-5">
          Could not load posts
        </FlatAlert>
      );

    return (
      <PostList
        posts={newsfeed}
        updateLikes={updateLikes}
        currentUser={currentUser}
      />
    );
  };

  return (
    <Layout pageTitle="Home" currentUser={currentUser}>
      <Row>
        <Col md={{ span: 4, order: 'last' }}>
          {topMenu()}
          {sidebar()}
        </Col>
        <Col>
          <NewPost addNewPostToFeed={addNewPostToFeed} />
          {displayNewsfeed()}
        </Col>
      </Row>
    </Layout>
  );
};

export default Home;
