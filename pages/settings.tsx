import React, { useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import axios from 'axios';
import connectMongo from '../utils/connectMongo';
import User from '../models/User';
import { authOptions } from './api/auth/[...nextauth]';
import { SessionUser } from '../types/misc';
import Layout from '../components/layout/Layout';
import ProfilePictureUpload from '../components/settings/ProfilePictureUpload';
import AboutMeUpdate from '../components/settings/AboutMeUpdate';
import FlatSpinner from '../components/spinners/FlatSpinner';

export const getServerSideProps: GetServerSideProps<{
  currentUser: SessionUser;
  bio: string;
  profilePicture: string;
}> = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  await connectMongo();

  const fetchedUser = await User.findById(
    session!.user.id,
    'bio profilePicture',
  );

  return {
    props: {
      currentUser: session!.user,
      bio: fetchedUser?.bio || '',
      profilePicture: fetchedUser?.profilePicture || '',
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Settings = ({ currentUser, bio, profilePicture }: Props) => {
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
            />
            Email sent to {currentUser.email}
          </p>
        );
      default:
        return <Button onClick={handlePasswordReset}>Reset Password</Button>;
    }
  };

  return (
    <Layout
      pageTitle="Settings"
      currentUser={currentUser}
      profilePicture={profilePicture}
    >
      <div className="d-flex justify-content-center">
        <div style={{ width: 600, maxWidth: 600 }}>
          <h2 className="mb-5">Settings</h2>
          <h4 className="h6 mb-3">Profile Picture</h4>
          <ProfilePictureUpload
            currentUser={currentUser}
            profilePicture={profilePicture}
          />
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
