import Link from 'next/link';
import Image from './Image';
import { defaultDate } from '../utils/dateHelpers';
import FriendRequestButtons from './FriendRequestButtons';

const FriendRequest = ({ friendReq, onRemove }) => (
  <div className="mb-4" style={{ width: 200 }}>
    <div className="d-flex align-items-center mb-2">
      <Image
        publicId={friendReq.user.profilePicture}
        profilePicName={friendReq.user.name}
        size="40"
        variant="circle"
        href={`/profile/${friendReq.user.username}`}
      />
      <Link href={`/profile/${friendReq.user.username}`} passHref>
        <a className="mt-1 ml-2 h6 text-dark">{friendReq.user.name}</a>
      </Link>
    </div>
    <p className="small mb-2 text-center text-muted">
      Requested {defaultDate(friendReq.timestamp)}
    </p>
    <div className="d-flex justify-content-center">
      <FriendRequestButtons
        id={friendReq.user.id}
        onApprove={onRemove}
        onDelete={onRemove}
      />
    </div>
  </div>
);

export default FriendRequest;
