import middleware from '../middleware';
import Layout from '../components/Layout';
import ProfilePictureUpload from '../components/ProfilePictureUpload';
import AboutMeUpdate from '../components/AboutMeUpdate';
import User from '../models/User';

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

  const fetchedUser = await User.findById(reqUser.id, 'bio');
  const bio = fetchedUser.bio || null;

  const currentUser = JSON.parse(JSON.stringify(reqUser));

  return {
    props: {
      currentUser,
      bio,
    },
  };
}

const Settings = ({ currentUser, bio }) => (
  <Layout pageTitle="Settings" currentUser={currentUser}>
    <div className="d-flex justify-content-center">
      <div style={{ width: 600, maxWidth: 600 }}>
        <h2 className="mb-5">Settings</h2>
        <h3 className="h4 mb-4">Profile</h3>
        <h4 className="h6 mb-3">Profile Picture</h4>
        <ProfilePictureUpload currentUser={currentUser} />
        <h4 className="h6 mb-3 mt-4">About Me</h4>
        <AboutMeUpdate originalBio={bio} />
      </div>
    </div>
  </Layout>
);

export default Settings;
