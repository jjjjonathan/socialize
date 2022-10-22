import { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import axios from 'axios';
import { authOptions } from '../api/auth/[...nextauth]';
import Splash from '../../components/layout/Splash';
import CircleSpinner from '../../components/spinners/CircleSpinner';
import Alert from '../../components/ui/Alert';

type VerifyEmailRequestStatus = 'default' | 'sent' | 'error';

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session?.user?.isEmailVerified) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  if (query?.email) {
    return {
      props: {
        email: query.email,
      },
    };
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const VerifyEmail = ({ email }: Props) => {
  const [status, setStatus] = useState<VerifyEmailRequestStatus>('default');

  useEffect(() => {
    (async () => {
      try {
        await axios.post('/api/verify-email', { email });
        setStatus('sent');
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    })();
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
