import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { unstable_getServerSession } from 'next-auth/next';
import { Row, Col, Card, Button } from 'react-bootstrap';
import parse from 'html-react-parser';
import { authOptions } from '../../api/auth/[...nextauth]';
import usePostsByUser from '../../../hooks/usePostsByUser';
import User from '../../../models/User';
import { monthYear } from '../../../utils/dateHelpers';
import connectMongo from '../../../utils/connectMongo';
import Image from '../../../components/ui/Image';
import Layout from '../../../components/layout/Layout';
import PostList from '../../../components/PostList';
import CircleSpinner from '../../../components/spinners/CircleSpinner';
import NewPost from '../../../components/NewPost';
import ProfileFriendButton from '../../../components/ProfileFriendButton';
import FriendsList from '../../../components/profile/FriendsList';
import FlatAlert from '../../../components/ui/FlatAlert';

export const getServerSideProps: GetServerSideProps<{
  profile: any;
  currentUser: any;
  isOwnProfile: boolean;
  friendStatus: any;
}> = async ({ req, res, query }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  await connectMongo();

  const sessionUserId = session?.user.id;

  const sessionUser = await User.findById(sessionUserId);

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

  const { requestedFriends } = await User.findById(sessionUserId).populate(
    'requestedFriends',
  );

  let friendStatus = null;

  if (
    user.friends.find((friend) => friend.user.id.toString() === sessionUserId)
  ) {
    friendStatus = 'friends';
  } else if (
    requestedFriends.find(
      (reqFriend) => reqFriend._id.toString() === user.id.toString(),
    )
  ) {
    friendStatus = 'requested';
  } else if (
    sessionUser.friendRequests.find(
      (friendReq) => friendReq.user.toString() === user.id.toString(),
    )
  ) {
    friendStatus = 'request';
  }

  const isOwnProfile = sessionUserId === user.id;

  return {
    props: {
      isOwnProfile,
      profile: user,
      currentUser: session.user,
      friendStatus,
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Profile = ({
  profile,
  currentUser,
  isOwnProfile,
  friendStatus,
}: Props) => {
  const router = useRouter();
  const { user } = router.query;
  const {
    postsByUser,
    isPostsByUserError,
    isPostsByUserLoading,
    setPostsByUser,
  } = usePostsByUser(user);

  const addNewPostToFeed = () => {
    setPostsByUser();
  };

  const removePostFromFeed = (postId) => {
    const nextState = {
      ...postsByUser,
      posts: postsByUser.posts.filter((post) => post.id !== postId),
    };
    setPostsByUser(nextState);
  };

  const updateLikes = (postId, likes) => {
    const nextState = {
      ...postsByUser,
      posts: postsByUser.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes,
          };
        }
        return post;
      }),
    };
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
    return (
      <PostList
        posts={postsByUser.posts}
        updateLikes={updateLikes}
        currentUser={currentUser}
        removePostFromList={removePostFromFeed}
      />
    );
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
        {!isOwnProfile && (
          <ProfileFriendButton
            username={profile.username}
            name={profile.name}
            id={profile.id}
            className="ml-auto"
            friendStatus={friendStatus}
          />
        )}
      </div>
      <Row>
        <Col md={{ span: 4 }}>
          <Card className="gradient-glass-card mb-4">
            <Card.Header className="d-flex">
              <h4 className="h5 mb-0">About me</h4>
              {isOwnProfile && (
                <Link href="/settings" passHref>
                  <Button
                    variant="outline-dark"
                    as="a"
                    className="ml-auto circle-button-small"
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </Button>
                </Link>
              )}
            </Card.Header>
            <Card.Body>
              {profile.bio && (
                <>
                  <p>{parse(profile.bio)}</p>
                  <hr />
                </>
              )}
              <p className="my-0 medium text-center">
                Member since {monthYear(profile.userSince)}
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
