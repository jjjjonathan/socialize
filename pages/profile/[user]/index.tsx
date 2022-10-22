import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { unstable_getServerSession } from 'next-auth/next';
import { Row, Col, Card, Button } from 'react-bootstrap';
import parse from 'html-react-parser';
import { Document, Types } from 'mongoose';
import { authOptions } from '../../api/auth/[...nextauth]';
import usePostsByUser from '../../../hooks/usePostsByUser';
import User from '../../../models/User';
import { monthYear } from '../../../utils/dateHelpers';
import connectMongo from '../../../utils/connectMongo';
import { FriendStatus, SessionUser } from '../../../types/misc';
import { FriendRes, UserRecord, UserRes } from '../../../types/records';
import Image from '../../../components/ui/Image';
import Layout from '../../../components/layout/Layout';
import PostList from '../../../components/post/PostList';
import CircleSpinner from '../../../components/spinners/CircleSpinner';
import NewPost from '../../../components/post/NewPost';
import ProfileFriendButton from '../../../components/profile/ProfileFriendButton';
import FriendsList from '../../../components/profile/FriendsList';
import FlatAlert from '../../../components/ui/FlatAlert';

export const getServerSideProps: GetServerSideProps<{
  profile: Omit<UserRes, 'friends'> & { friends: FriendRes[] };
  currentUser: SessionUser;
  isOwnProfile: boolean;
  friendStatus: FriendStatus | null;
  username: string;
}> = async ({ req, res, query }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  await connectMongo();

  const sessionUserId = session?.user.id;
  const sessionUser = await User.findById(sessionUserId).populate<{
    requestedFriends: Array<Document<Types.ObjectId> & UserRecord>;
  }>('requestedFriends');

  const username = query.user as string | undefined;

  const user = await User.findOne({ username }, '-friendRequests').populate<{
    friends: FriendRes[];
  }>('friends.user', 'name username profilePicture');

  if (!user || !username) {
    return {
      notFound: true,
    };
  }

  const requestedFriends = sessionUser?.requestedFriends || [];

  let friendStatus: FriendStatus | null = null;

  if (
    user.friends.find((friend) => friend.user.id.toString() === sessionUserId)
  ) {
    friendStatus = 'friends';
  } else if (
    requestedFriends.find(
      (reqFriend) => reqFriend._id!.toString() === user.id.toString(),
    )
  ) {
    friendStatus = 'requested';
  } else if (
    sessionUser?.friendRequests.find(
      (friendReq) => friendReq.user.toString() === user.id.toString(),
    )
  ) {
    friendStatus = 'request';
  }

  const isOwnProfile = sessionUserId === user.id;

  const profile = JSON.parse(JSON.stringify(user));

  return {
    props: {
      isOwnProfile,
      profile,
      currentUser: session!.user,
      friendStatus,
      username,
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Profile = ({
  profile,
  currentUser,
  isOwnProfile,
  friendStatus,
  username,
}: Props) => {
  const {
    postsByUser,
    isPostsByUserError,
    isPostsByUserLoading,
    setPostsByUser,
  } = usePostsByUser(username);

  const addNewPostToFeed = () => {
    setPostsByUser();
  };

  const removePostFromFeed = (postId: string) => {
    const nextState = {
      ...postsByUser!,
      posts: postsByUser?.posts.filter((post) => post.id !== postId) || [],
    };
    setPostsByUser(nextState);
  };

  const updateLikes = (postId: string, likes: string[]) => {
    const nextState = {
      ...postsByUser!,
      posts:
        postsByUser?.posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              likes,
            };
          }
          return post;
        }) || [],
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
        posts={postsByUser!.posts}
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
          <h3 className="text-muted h6">@{username}</h3>
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
          {isOwnProfile && <NewPost addNewPostToFeed={addNewPostToFeed} />}
          {postArea()}
        </Col>
      </Row>
    </Layout>
  );
};

export default Profile;
