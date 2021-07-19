import { NavDropdown } from 'react-bootstrap';
import useFriendRequests from '../hooks/useFriendRequests';
import FlatSpinner from './FlatSpinner';
import FriendRequest from './FriendRequest';

const FriendRequestsDropdown = () => {
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
    return (
      <NavDropdown title="Friend Requests" id="friend-requests-dropdown">
        <FlatSpinner />
      </NavDropdown>
    );
  }

  if (isFriendRequestsError) {
    return (
      <NavDropdown title="Friend Requests" id="friend-requests-dropdown">
        <p className="text-danger">Error loading</p>
      </NavDropdown>
    );
  }

  if (friendRequests.friendRequests?.length === 0) {
    return (
      <NavDropdown title="Friend Requests" id="friend-requests-dropdown">
        <p>None</p>
      </NavDropdown>
    );
  }

  return (
    <NavDropdown title="Friend Requests" id="friend-requests-dropdown">
      {friendRequests.friendRequests.map((friendReq) => (
        <FriendRequest
          friendReq={friendReq}
          onRemove={onRemove}
          key={friendReq.id}
        />
      ))}
    </NavDropdown>
  );
};

export default FriendRequestsDropdown;
