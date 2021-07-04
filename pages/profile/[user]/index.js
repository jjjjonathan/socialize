import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import usePostsByUser from '../../../hooks/usePostsByUser';
import Layout from '../../../components/Layout';
import Newsfeed from '../../../components/Newsfeed';
import CircleSpinner from '../../../components/CircleSpinner';
import User from '../../../models/User';

export async function getServerSideProps(context) {
  const { user: username } = context.query;
  const user = await User.findOne({ username }, '-friendRequests');
  const profile = JSON.parse(JSON.stringify(user));

  if (!profile) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      profile,
    },
  };
}

const Profile = ({ profile }) => {
  const router = useRouter();
  const { user } = router.query;
  const {
    postsByUser,
    // isPostsByUserError, TODO add error handling
    isPostsByUserLoading,
    // setPostsByUser, TODO add ability to add new posts
  } = usePostsByUser(user);

  return (
    <Layout pageTitle="Home">
      <h3>{profile.name}</h3>
      <h4>@{user}</h4>
      <Row>
        <Col md={{ span: 4 }} style={{ background: 'lightgray' }}>
          <h3>friends list, about me, links, photos?</h3>
          <p>User since: {profile.userSince}</p>
        </Col>
        <Col>
          {isPostsByUserLoading ? (
            <div className="d-flex justify-content-center mt-3">
              <CircleSpinner size="50" />
            </div>
          ) : (
            <Newsfeed posts={postsByUser.posts} />
          )}
        </Col>
      </Row>
    </Layout>
  );
};

export default Profile;
