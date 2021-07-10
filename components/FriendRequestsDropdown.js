import { NavDropdown } from 'react-bootstrap';
import useFriendRequests from '../hooks/useFriendRequests';
import FlatSpinner from './FlatSpinner';

const FriendRequestsDropdown = () => {
  const {
    friendRequests,
    isFriendRequestsError,
    isFriendRequestsLoading,
    // setFriendRequests, TODO add click to refresh to error
  } = useFriendRequests();

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

  if (friendRequests.friendRequests.length === 0) {
    return (
      <NavDropdown title="Friend Requests" id="friend-requests-dropdown">
        <p>None</p>
      </NavDropdown>
    );
  }

  return (
    <NavDropdown title="Friend Requests" id="friend-requests-dropdown">
      <ul>
        {friendRequests.friendRequests.map((friendReq) => (
          <li key={friendReq.id}>{friendReq.user.name}</li>
        ))}
      </ul>
    </NavDropdown>
  );
};

export default FriendRequestsDropdown;
