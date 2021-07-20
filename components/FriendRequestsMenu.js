import useFriendRequests from '../hooks/useFriendRequests';
import FlatSpinner from './FlatSpinner';
import FriendRequest from './FriendRequest';

const FriendRequestsMenu = () => {
  const {
    friendRequests,
    isFriendRequestsError,
    isFriendRequestsLoading,
    setFriendRequests, // TODO add click to refresh to error (route to login if 401 ?)
  } = useFriendRequests();

  const onRemove = (userId) => {
    const nextState = friendRequests.friendRequests.filter(
      (friendReq) => userId !== friendReq.user.id,
    );
    setFriendRequests(nextState);
  };

  if (isFriendRequestsLoading) {
    return <FlatSpinner />;
  }

  if (isFriendRequestsError) {
    return <p className="text-danger">Error loading</p>;
  }

  if (friendRequests.friendRequests?.length === 0) {
    return <p>None</p>;
  }

  return (
    <>
      {friendRequests.friendRequests.map((friendReq) => (
        <FriendRequest
          friendReq={friendReq}
          onRemove={onRemove}
          key={friendReq.id}
        />
      ))}
    </>
  );
};

export default FriendRequestsMenu;
