import { useRouter } from 'next/router';
import { Row, Col, Card } from 'react-bootstrap';
import produce from 'immer';
import Image from '../../../components/Image';
import middleware from '../../../middleware';
import usePostsByUser from '../../../hooks/usePostsByUser';
import Layout from '../../../components/Layout';
import PostList from '../../../components/PostList';
import CircleSpinner from '../../../components/CircleSpinner';
import User from '../../../models/User';
import { monthYear } from '../../../utils/dateHelpers';
import NewPost from '../../../components/NewPost';
import AddFriendButton from '../../../components/AddFriendButton';
import FriendsList from '../../../components/FriendsList';

export async function getServerSideProps({ req, res, query }) {
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

  const { user: username } = query;
  const user = await User.findOne({ username }, '-friendRequests').populate(
    'friends.user',
    'name username profilePicture',
  );

  if (!user) {
    return {
      notFound: true,
    };
  }

  const isOwnProfile = reqUser.id === user.id;
  const profile = JSON.parse(JSON.stringify(user));
  const currentUser = JSON.parse(JSON.stringify(reqUser));

  return {
    props: {
      isOwnProfile,
      profile,
      currentUser,
    },
  };
}

const Profile = ({ profile, currentUser, isOwnProfile }) => {
  const router = useRouter();
  const { user } = router.query;
  const {
    postsByUser,
    // isPostsByUserError, TODO add error handling
    isPostsByUserLoading,
    setPostsByUser,
  } = usePostsByUser(user);

  const addNewPostToFeed = (newPost) => {
    const nextState = produce(postsByUser, (draft) => {
      draft.posts.unshift(newPost);
    });
    setPostsByUser(nextState);
  };

  return (
    <Layout pageTitle={profile.name} currentUser={currentUser}>
      <div className="mb-4 d-flex align-items-center">
        <Image
          publicId={profile.profilePicture}
          profilePicName={profile.name}
          size="100"
          variant="circle"
          blurPlaceholder
        />
        <div className="ml-3">
          <h2 className="mb-1">{profile.name}</h2>
          <h3 className="text-muted h6">@{user}</h3>
        </div>
        {!isOwnProfile ? <AddFriendButton className="ml-auto" /> : null}
      </div>
      <Row>
        <Col md={{ span: 4 }}>
          <Card className="gradient-glass-card mb-4">
            <Card.Header>
              <h4 className="h5 mb-0">About me</h4>
            </Card.Header>
            <Card.Body>
              <p className="my-0">
                socializing since {monthYear(profile.userSince)}
              </p>
            </Card.Body>
          </Card>
          <FriendsList friends={profile.friends} />
        </Col>
        <Col>
          {isOwnProfile ? (
            <NewPost addNewPostToFeed={addNewPostToFeed} />
          ) : null}
          {isPostsByUserLoading ? (
            <div className="d-flex justify-content-center mt-3">
              <CircleSpinner size="50" />
            </div>
          ) : (
            <PostList posts={postsByUser.posts} />
          )}
        </Col>
      </Row>
    </Layout>
  );
};

export default Profile;
