import React from 'react';
import Link from 'next/link';
import Image from '../ui/Image';
import useNewUsers from '../../hooks/useNewUsers';
import FlatSpinner from '../spinners/FlatSpinner';
import FlatAlert from '../ui/FlatAlert';
import AddFriendButton from './AddFriendButton';

const NewUsers = () => {
  const { newUsers, isNewUsersLoading, isNewUsersError, setNewUsers } =
    useNewUsers();

  const onRemove = (username: string) => {
    if (!newUsers) return;
    const nextState = newUsers.filter((user) => username !== user.username);
    setNewUsers(nextState);
  };

  if (isNewUsersLoading) return <FlatSpinner size="20" />;
  if (isNewUsersError)
    return <FlatAlert type="error">Could not load new users</FlatAlert>;
  if (newUsers?.length === 0) return <FlatAlert>No more new users</FlatAlert>;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {newUsers?.map((user) => (
        <div className="d-flex align-items-center mb-2" key={user.id}>
          <Image
            publicId={user.profilePicture}
            size="40"
            variant="circle"
            profilePicName={user.name}
            href={`/profile/${user.username}`}
            layout="fixed"
          />
          <Link href={`/profile/${user.username}`} passHref>
            <a className="h6 ml-3 mb-0 text-secondary font-weight-bold">
              {user.name}
            </a>
          </Link>
          <AddFriendButton
            username={user.username}
            className="ml-auto"
            onRemove={onRemove}
          />
        </div>
      ))}
    </>
  );
};

export default NewUsers;
