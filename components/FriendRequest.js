import { useState } from 'react';
import Image from 'next/image';
import { ButtonGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { defaultDate } from '../utils/dateHelpers';
import FlatSpinner from './FlatSpinner';
import styles from './FriendRequest.module.css';

const FriendRequest = ({ friendReq, onRemove }) => {
  const [status, setStatus] = useState('default');

  const handleApprove = async () => {
    try {
      console.log(friendReq.user.id);
      setStatus('submitting');
      await axios.post(`/api/user/friend-request/${friendReq.user.id}/approve`);
      setStatus('approved');
      setTimeout(() => {
        onRemove(friendReq.user.id);
      }, 2000);
    } catch (error) {
      // TODO add error handling
      setStatus('default');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      console.log(friendReq.user.id);
      setStatus('submitting');
      await axios.post(`/api/user/friend-request/${friendReq.user.id}/delete`);
      setStatus('deleted');
      setTimeout(() => {
        onRemove(friendReq.user.id);
      }, 2000);
    } catch (error) {
      // TODO add error handling
      setStatus('default');
      console.error(error);
    }
  };

  const buttons = () => {
    switch (status) {
      case 'submitting':
        return <FlatSpinner size="20" />;
      case 'approved':
        return (
          <p className="text-center mb-0">
            <i className="bi bi-check-lg"></i> Approved!
          </p>
        );
      case 'deleted':
        return (
          <p className="text-center mb-0">
            <i className="bi bi-check-lg"></i> Deleted!
          </p>
        );
      default:
        return (
          <ButtonGroup aria-label="Group of friend request buttons">
            <Button className={styles.button} onClick={handleApprove}>
              Approve
            </Button>
            <Button
              variant="danger"
              className={styles.button}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </ButtonGroup>
        );
    }
  };

  return (
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
      {buttons()}
    </div>
  );
};

export default FriendRequest;
