import { useRouter } from 'next/router';
import middleware from '../../middleware';
import Splash from '../../components/Splash';
import CircleSpinner from '../../components/CircleSpinner';

export async function getServerSideProps({ req, res }) {
  await middleware.run(req, res);

  if (!req.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (req.user.isEmailVerified) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
}

const VerifyEmail = () => {
  const router = useRouter();

  return (
    <Splash pageTitle="Verify Email">
      <CircleSpinner size="70" />
    </Splash>
  );
};

export default VerifyEmail;
