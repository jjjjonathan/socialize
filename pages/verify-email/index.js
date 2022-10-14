import { useEffect, useState } from 'react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import axios from 'axios';
import Splash from '../../components/Splash';
import CircleSpinner from '../../components/CircleSpinner';
import Alert from '../../components/Alert';

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session.user.isEmailVerified) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      email: session.user.email,
    },
  };
}

const VerifyEmail = ({ email }) => {
  const [status, setStatus] = useState('default');

  useEffect(async () => {
    try {
      await axios.post('/api/verify-email');
      setStatus('sent');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  }, []);

  const innards = () => {
    switch (status) {
      case 'sent':
        return (
          <Alert>
            <p>Verification email sent to {email}!</p>
            <p className="medium mb-0">
              Verification link will expire in 20 minutes.
            </p>
          </Alert>
        );
      case 'error':
        return <Alert type="error">Could not send verification email!</Alert>;
      default:
        return <CircleSpinner size="70" />;
    }
  };

  return <Splash pageTitle="Verify Email">{innards()}</Splash>;
};

export default VerifyEmail;
