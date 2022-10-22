import React from 'react';
import useFriendRequests from '../../hooks/useFriendRequests';
import FlatAlert from '../ui/FlatAlert';
import FlatSpinner from '../spinners/FlatSpinner';
import FriendRequest from './FriendRequest';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="px-4 py-1 font-weight-normal">{children}</div>
);

const FriendRequestsMenu = () => {
  const {
    friendRequests,
    isFriendRequestsError,
    isFriendRequestsLoading,
    setFriendRequests,
  } = useFriendRequests();

  const onRemove = (userId?: string) => {
    const nextState = {
      id: friendRequests!.id,
      friendRequests:
        friendRequests?.friendRequests.filter(
          (friendReq) => userId !== friendReq.user.id,
        ) || [],
    };
    setFriendRequests(nextState);
  };

  if (isFriendRequestsLoading) {
    return (
      <Wrapper>
        <FlatSpinner size="20" />
      </Wrapper>
    );
  }

  if (isFriendRequestsError) {
    return (
      <Wrapper>
        <FlatAlert type="error">Could not load friend requests</FlatAlert>
      </Wrapper>
    );
  }

  if (friendRequests?.friendRequests?.length === 0) {
    return (
      <Wrapper>
        <FlatAlert>No friend requests</FlatAlert>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {friendRequests?.friendRequests.map((friendReq) => (
        <FriendRequest
          friendReq={friendReq}
          onRemove={onRemove}
          key={friendReq.id}
        />
      ))}
    </Wrapper>
  );
};

export default FriendRequestsMenu;
