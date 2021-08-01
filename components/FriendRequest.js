import Image from './Image';
import { defaultDate } from '../utils/dateHelpers';
import FriendRequestButtons from './FriendRequestButtons';

const FriendRequest = ({ friendReq, onRemove }) => (
  <div>
    <div className="d-flex align-items-center">
      <Image
        publicId={friendReq.user.profilePicture}
        profilePicName={friendReq.user.name}
        size="40"
        variant="circle"
      />
      <h6 className="mb-0 ml-2">{friendReq.user.name}</h6>
    </div>
    <p className="small">Requested {defaultDate(friendReq.timestamp)}</p>
    <FriendRequestButtons
      id={friendReq.user.id}
      onApprove={onRemove}
      onDelete={onRemove}
    />
  </div>
);

export default FriendRequest;
