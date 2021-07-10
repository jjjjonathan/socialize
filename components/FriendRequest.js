import Image from 'next/image';
import { ButtonGroup, Button } from 'react-bootstrap';
import { defaultDate } from '../utils/dateHelpers';
import styles from './FriendRequest.module.css';

const FriendRequest = ({ friendReq }) => (
  <div>
    <div className="d-flex align-items-center">
      <Image
        src={friendReq.user.profilePicture}
        alt={`Profile picture of ${friendReq.user.name}`}
        width="40"
        height="40"
      />
      <h6 className="mb-0 ml-2">{friendReq.user.name}</h6>
    </div>
    <p className="small">Requested {defaultDate(friendReq.timestamp)}</p>
    <ButtonGroup aria-label="Group of friend request buttons">
      <Button className={styles.button}>Approve</Button>
      <Button variant="danger" className={styles.button}>
        Delete
      </Button>
    </ButtonGroup>
  </div>
);

export default FriendRequest;
