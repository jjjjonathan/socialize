import axios from 'axios';
import { useState, useEffect, DetailedHTMLProps, HTMLAttributes } from 'react';
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import styles from './ProfileFriendButton.module.css';
import FlatSpinner from '../spinners/FlatSpinner';
import FriendRequestButtons from '../FriendRequestButtons';
import { FriendStatus } from '../../types/misc';

type FriendButtonStatus = 'default' | 'submitting' | FriendStatus;

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  friendStatus: FriendStatus | null;
  name: string;
  username: string;
  id: string;
}

const ProfileFriendButton = ({
  friendStatus,
  name,
  username,
  id,
  ...props
}: Props) => {
  const [status, setStatus] = useState<FriendButtonStatus>('default');

  useEffect(() => {
    if (friendStatus) setStatus(friendStatus);
  }, [friendStatus]);

  const onAddFriend = async () => {
    try {
      setStatus('submitting');
      await axios.post(`/api/user/${username}/add-friend`);
      setStatus('requested');
    } catch (error) {
      setStatus('default');
      console.error(error);
      toast.error('Could not add friend!');
    }
  };

  const onRequestApprove = () => {
    setStatus('friends');
  };

  const onRequestDelete = () => {
    setStatus('default');
  };

  const innards = () => {
    switch (status) {
      case 'submitting':
        return (
          <Button disabled variant="secondary" className={styles.button}>
            <FlatSpinner
              size="20"
              color="white"
              style={{ marginTop: '-1px' }}
            />
          </Button>
        );
      case 'requested':
        return (
          <div className={`text-secondary h6 ${styles.requested}`}>
            <i className="bi bi-check-lg text-secondary mr-1"></i> Friend
            Requested
          </div>
        );
      case 'request':
        return (
          <div className="d-flex flex-column align-items-end">
            <small className="mb-2">{name} added you as a friend!</small>
            <FriendRequestButtons
              id={id}
              onApprove={onRequestApprove}
              onDelete={onRequestDelete}
            />
          </div>
        );
      case 'friends':
        return (
          <div className={`text-secondary h6 ${styles.friends}`}>
            <i className="bi bi-check-lg text-secondary mr-1"></i> Friends
          </div>
        );
      default:
        return (
          <Button
            onClick={onAddFriend}
            variant="secondary"
            className={styles.button}
          >
            <i className="bi bi-person-plus"></i> Add Friend
          </Button>
        );
    }
  };

  return <div {...props}>{innards()}</div>;
};

export default ProfileFriendButton;
