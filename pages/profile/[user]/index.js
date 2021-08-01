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
import ProfileFriendButton from '../../../components/ProfileFriendButton';
import FriendsList from '../../../components/FriendsList';
import FlatAlert from '../../../components/FlatAlert';

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

  const { requestedFriends } = await User.findById(reqUser).populate(
    'requestedFriends',
  );

  let friendStatus = '';

  if (user.friends.find((friend) => friend.user.id === reqUser.id)) {
    friendStatus = 'friends';
  } else if (
    requestedFriends.find(
      (reqFriend) => reqFriend._id.toString() === user.id.toString(),
    )
  ) {
    friendStatus = 'requested';
  }

  const isOwnProfile = reqUser.id === user.id;
  const profile = JSON.parse(JSON.stringify(user));
  const currentUser = JSON.parse(JSON.stringify(reqUser));

  return {
    props: {
      isOwnProfile,
      profile,
      currentUser,
      friendStatus,
    },
  };
}

const Profile = ({ profile, currentUser, isOwnProfile, friendStatus }) => {
  const router = useRouter();
  const { user } = router.query;
  const {
    postsByUser,
    isPostsByUserError,
    isPostsByUserLoading,
    setPostsByUser,
  } = usePostsByUser(user);

  const addNewPostToFeed = (newPost) => {
    const nextState = produce(postsByUser, (draft) => {
      draft.posts.unshift(newPost);
    });
    setPostsByUser(nextState);
  };

  const postArea = () => {
    if (isPostsByUserLoading)
      return (
        <div className="d-flex justify-content-center mt-5">
          <CircleSpinner size="50" />
        </div>
      );
    if (isPostsByUserError)
      return (
        <FlatAlert type="error" className="text-center mt-5">
          Could not load posts
        </FlatAlert>
      );
    return <PostList posts={postsByUser.posts} />;
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
        {!isOwnProfile ? (
          <ProfileFriendButton
            username={profile.username}
            name={profile.name}
            id={profile.id}
            className="ml-auto"
            friendStatus={friendStatus}
          />
        ) : null}
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
          {postArea()}
        </Col>
      </Row>
    </Layout>
  );
};

export default Profile;
