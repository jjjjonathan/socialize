import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Splash from '../../components/Splash';
import CircleSpinner from '../../components/CircleSpinner';
import useCurrentUser from '../../hooks/useCurrentUser';

const FacebookLogin = () => {
  const router = useRouter();
  const { currentUser, setCurrentUser, isLoading } = useCurrentUser();

  useEffect(() => {
    setCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) router.push('/');
  }, [currentUser]);

  useEffect(() => {
    if (!isLoading && !currentUser) router.push('/login');
  }, [isLoading]);

  return (
    <Splash pageTitle="Log in">
      <CircleSpinner size="70" />
    </Splash>
  );
};

export default FacebookLogin;
