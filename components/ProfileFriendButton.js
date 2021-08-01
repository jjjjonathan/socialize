import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import styles from './ProfileFriendButton.module.css';
import FlatSpinner from './FlatSpinner';

const ProfileFriendButton = ({ friendStatus, name, username, ...props }) => {
  const [status, setStatus] = useState('default');

  useEffect(() => {
    if (friendStatus === 'friends') setStatus('friends');
    if (friendStatus === 'requested') setStatus('requested');
  }, [friendStatus]);

  const onClick = async () => {
    try {
      setStatus('submitting');
      await axios.post(`/api/user/${username}/add-friend`);
      setStatus('requested');
    } catch (error) {
      setStatus('default');
      console.error(error);
      toast.error('Could not add friend');
    }
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
          <div>
            <small>{name} added you as a friend!</small>
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
            onClick={onClick}
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
