import Image from 'next/image';
import Link from 'next/link';
import styles from './NewUsers.module.css';
import useNewUsers from '../hooks/useNewUsers';
import FlatSpinner from './FlatSpinner';
import Alert from './Alert';

const NewUsers = () => {
  const { newUsers, isNewUsersLoading, isNewUsersError } = useNewUsers();

  if (isNewUsersLoading) return <FlatSpinner />;
  if (isNewUsersError) return <Alert>Error loading users</Alert>;

  return (
    <>
      {newUsers.map((user) => (
        <div className="d-flex align-items-center mb-2" key={user.id}>
          <Link href={`/profile/${user.username}`} passHref>
            <a>
              <Image
                src={user.profilePicture}
                height="40"
                width="40"
                alt={`Profile picture of ${user.name}`}
              />
            </a>
          </Link>
          <Link href={`/profile/${user.username}`} passHref>
            <a className={`h6 ml-3 pt-2 ${styles.name}`}>{user.name}</a>
          </Link>
          <p className="ml-auto">+</p>
        </div>
      ))}
    </>
  );
};

export default NewUsers;