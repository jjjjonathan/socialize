import Image from 'next/image';
import Link from 'next/link';
import styles from './NewUsers.module.css';
import useNewUsers from '../hooks/useNewUsers';
import FlatSpinner from './FlatSpinner';
import Alert from './Alert';
import AddFriendButton from './AddFriendButton';

const NewUsers = () => {
  const { newUsers, isNewUsersLoading, isNewUsersError, setNewUsers } =
    useNewUsers();

  const onRemove = (username) => {
    const nextState = newUsers.filter((user) => username !== user.username);
    setNewUsers(nextState);
  };

  if (isNewUsersLoading) return <FlatSpinner />;
  if (isNewUsersError) return <Alert>Error loading users</Alert>;
  if (newUsers.length === 0) return <Alert>No more new users</Alert>;

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
            <a className={`h6 ml-3 mb-0 text-secondary ${styles.name}`}>
              {user.name}
            </a>
          </Link>
          <AddFriendButton
            username={user.username}
            variant="mini"
            className="ml-auto"
            onRemove={onRemove}
          />
        </div>
      ))}
    </>
  );
};

export default NewUsers;
