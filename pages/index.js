import { useState } from 'react';
import { Row, Col, ButtonGroup, Button, Collapse } from 'react-bootstrap';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import useNewsfeed from '../hooks/useNewsfeed';
import Layout from '../components/Layout';
import NewUsers from '../components/NewUsers';
import PostList from '../components/PostList';
import NewPost from '../components/NewPost';
import CircleSpinner from '../components/CircleSpinner';
import FlatAlert from '../components/FlatAlert';

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  return {
    props: {
      currentUser: session.user,
    },
  };
}

const Home = ({ currentUser }) => {
  const [newUsersOpen, setNewUsersOpen] = useState(false);
  const [newPostOpen, setNewPostOpen] = useState(false);

  const { newsfeed, isNewsfeedError, isNewsfeedLoading, setNewsfeed } =
    useNewsfeed();

  const addNewPostToFeed = () => {
    setNewsfeed();
  };

  const topMenu = () => (
    <>
      <div className="d-md-none w-100">
        <div className="mb-4 d-flex justify-content-center w-100">
          <ButtonGroup className="special w-100">
            <Button
              variant={newUsersOpen ? 'primary' : 'outline-dark'}
              onClick={() => {
                setNewUsersOpen(!newUsersOpen);
                setNewPostOpen(false);
              }}
              aria-expanded={newUsersOpen}
              aria-controls="collapse-new-users"
            >
              <i className="bi bi-file-earmark-person"></i> New Users
            </Button>
            <Button
              variant={newPostOpen ? 'primary' : 'outline-dark'}
              onClick={() => {
                setNewPostOpen(!newPostOpen);
                setNewUsersOpen(false);
              }}
              aria-expanded={newPostOpen}
              aria-controls="collapse-new-post"
            >
              <i className="bi bi-file-earmark-plus-fill"></i> New Post
            </Button>
          </ButtonGroup>
        </div>
        <Collapse in={newUsersOpen}>
          <div id="collapse-new-users">
            <div className="mb-4 mx-5">
              <h4 className="mb-3 text-center">New users</h4>
              <NewUsers />
            </div>
          </div>
        </Collapse>
        <Collapse in={newPostOpen}>
          <div>
            <div id="collapse-new-post">
              <NewPost addNewPostToFeed={addNewPostToFeed} />
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

  const removePostFromFeed = (postId) => {
    const nextState = newsfeed.filter((post) => post.id !== postId);
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
        removePostFromList={removePostFromFeed}
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
          <div className="d-none d-md-block">
            <NewPost addNewPostToFeed={addNewPostToFeed} />
          </div>
          {displayNewsfeed()}
        </Col>
      </Row>
    </Layout>
  );
};

export default Home;
