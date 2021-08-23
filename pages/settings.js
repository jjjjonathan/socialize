import { useState } from 'react';
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import axios from 'axios';
import parse from 'html-react-parser';
import middleware from '../middleware';
import Layout from '../components/Layout';
import ProfilePictureUpload from '../components/ProfilePictureUpload';
import AboutMeUpdate from '../components/AboutMeUpdate';
import User from '../models/User';
import FlatSpinner from '../components/FlatSpinner';

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
  const bio = fetchedUser.bio ? parse(fetchedUser.bio) : null;

  const currentUser = JSON.parse(JSON.stringify(reqUser));

  return {
    props: {
      currentUser,
      bio,
    },
  };
}

const Settings = ({ currentUser, bio }) => {
  const [passwordStatus, setPasswordStatus] = useState('default');

  const handlePasswordReset = async () => {
    try {
      setPasswordStatus('sending');
      await axios.post('/api/user/change-password/request');
      setPasswordStatus('sent');
    } catch (error) {
      setPasswordStatus('default');
      console.error(error);
      toast.error('Could not send password reset email!');
    }
  };

  const resetPasswordButton = () => {
    switch (passwordStatus) {
      case 'sending':
        return <FlatSpinner size="18" />;
      case 'sent':
        return (
          <p className="text-success">
            <i
              className="bi bi-check h3"
              style={{ position: 'relative', top: 4 }}
            ></i>
            Email sent to {currentUser.email}
          </p>
        );
      default:
        return <Button onClick={handlePasswordReset}>Reset Password</Button>;
    }
  };

  return (
    <Layout pageTitle="Settings" currentUser={currentUser}>
      <div className="d-flex justify-content-center">
        <div style={{ width: 600, maxWidth: 600 }}>
          <h2 className="mb-5">Settings</h2>
          <h4 className="h6 mb-3">Profile Picture</h4>
          <ProfilePictureUpload currentUser={currentUser} />
          <h4 className="h6 mb-3 mt-5">About Me</h4>
          <AboutMeUpdate originalBio={bio} />
          {currentUser.username !== 'example' && (
            <>
              <h4 className="h6 mb-3 mt-5">Change Password</h4>
              <p>Get a password reset email here:</p>
              <div style={{ width: 'fit-content' }}>
                {resetPasswordButton()}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
