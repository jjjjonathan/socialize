import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Splash from '../../components/layout/Splash';
import CircleSpinner from '../../components/CircleSpinner';
import Alert from '../../components/Alert';

export async function getServerSideProps({ query }) {
  const { token } = query;

  return {
    props: { token },
  };
}

const VerifyToken = ({ token }) => {
  const router = useRouter();

  const [status, setStatus] = useState('default');

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
