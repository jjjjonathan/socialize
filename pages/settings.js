import { Row, Col } from 'react-bootstrap';
import middleware from '../middleware';
import Layout from '../components/Layout';
import ProfilePictureUpload from '../components/ProfilePictureUpload';

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

const Settings = ({ currentUser }) => (
  <Layout pageTitle="Settings" currentUser={currentUser}>
    <h2 className="mb-5">Settings</h2>
    <Row>
      <Col>
        <h3 className="h4 mb-4">Profile</h3>
        <h4 className="h6 mb-3">Profile Picture</h4>
        <ProfilePictureUpload currentUser={currentUser} />
      </Col>
      <Col>
        <h3 className="h4 mb-3">More settings</h3>
      </Col>
    </Row>
  </Layout>
);

export default Settings;
