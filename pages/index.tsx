import React, { useState } from 'react';
import { Row, Col, ButtonGroup, Button, Collapse } from 'react-bootstrap';
import { unstable_getServerSession } from 'next-auth/next';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { authOptions } from './api/auth/[...nextauth]';
import connectMongo from '../utils/connectMongo';
import User from '../models/User';
import useNewsfeed from '../hooks/useNewsfeed';
import Layout from '../components/layout/Layout';
import NewUsers from '../components/home/NewUsers';
import PostList from '../components/post/PostList';
import NewPost from '../components/post/NewPost';
import CircleSpinner from '../components/spinners/CircleSpinner';
import FlatAlert from '../components/ui/FlatAlert';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  await connectMongo();
  const sessionUser = await User.findById(session!.user.id);

  return {
    props: {
      currentUser: session?.user,
      profilePicture: sessionUser?.profilePicture || '',
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home = ({ currentUser, profilePicture }: Props) => {
  const [newUsersOpen, setNewUsersOpen] = useState(false);
  const [newPostOpen, setNewPostOpen] = useState(false);

  const { newsfeed, isNewsfeedError, isNewsfeedLoading, setNewsfeed } =
    useNewsfeed();

  const addNewPostToFeed = () => {
    setNewsfeed();
  };

  const topMenu = () => (
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
            <i className="bi bi-file-earmark-person" /> New Users
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
            <i className="bi bi-file-earmark-plus-fill" /> New Post
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
  );

  const sidebar = () => (
    <div className="d-none d-md-block">
      <h4 className="mb-3">New users</h4>
      <NewUsers />
    </div>
  );

  const removePostFromFeed = (postId: string) => {
    const nextState = newsfeed!.filter((post) => post.id !== postId);
    setNewsfeed(nextState);
  };

  const updateLikes = (postId: string, likes: string[]) => {
    const nextState = newsfeed!.map((post) => {
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
        posts={newsfeed || []}
        updateLikes={updateLikes}
        currentUser={currentUser}
        removePostFromList={removePostFromFeed}
      />
    );
  };

  return (
    <Layout
      pageTitle="Home"
      currentUser={currentUser}
      profilePicture={profilePicture}
    >
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
