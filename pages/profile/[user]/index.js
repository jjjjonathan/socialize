import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import usePostsByUser from '../../../hooks/usePostsByUser';
import Layout from '../../../components/Layout';
import Newsfeed from '../../../components/Newsfeed';
import CircleSpinner from '../../../components/CircleSpinner';

const Profile = () => {
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
      <h3>Jonathan Horn</h3>
      <h4>@{user}</h4>
      <Row>
        <Col md={{ span: 4 }} style={{ background: 'lightgray' }}>
          <h3>friends list, about me, links, photos?</h3>
        </Col>
        <Col>
          {isPostsByUserLoading ? (
            <CircleSpinner />
          ) : (
            <Newsfeed posts={postsByUser.posts} />
          )}
        </Col>
      </Row>
    </Layout>
  );
};

export default Profile;
