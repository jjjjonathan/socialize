import Image from './Image';
import { defaultDate } from '../utils/dateHelpers';
import FriendRequestButtons from './FriendRequestButtons';

const FriendRequest = ({ friendReq, onRemove }) => (
  <div className="mb-4">
    <div className="d-flex align-items-center mb-2">
      <Image
        publicId={friendReq.user.profilePicture}
        profilePicName={friendReq.user.name}
        size="40"
        variant="circle"
      />
      <h6 className="mt-1 ml-2">{friendReq.user.name}</h6>
    </div>
    <p className="small mb-2 text-center text-muted">
      Requested {defaultDate(friendReq.timestamp)}
    </p>
    <FriendRequestButtons
      id={friendReq.user.id}
      onApprove={onRemove}
      onDelete={onRemove}
    />
  </div>
);

export default FriendRequest;
