import React, { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import Splash from '../../components/layout/Splash';
import CircleSpinner from '../../components/spinners/CircleSpinner';
import Alert from '../../components/ui/Alert';

type VerifyEmailStatus = 'default' | 'verified' | 'error';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const token = query.token as string | undefined;

  return {
    props: { token },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const VerifyToken = ({ token }: Props) => {
  const router = useRouter();

  const [status, setStatus] = useState<VerifyEmailStatus>('default');

  useEffect(() => {
    (async () => {
      try {
        await axios.post(`/api/verify-email/${token}`);
        setStatus('verified');
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    })();
  }, []);

  const innards = () => {
    switch (status) {
      case 'verified':
        return (
          <Alert>
            <p>Email verified!</p>
            <p className="mb-0">Redirecting...</p>
          </Alert>
        );
      case 'error':
        return <Alert type="error">Could not verify email.</Alert>;
      default:
        return <CircleSpinner size="70" />;
    }
  };

  return <Splash pageTitle="Verify Email">{innards()}</Splash>;
};

export default VerifyToken;
