/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { ButtonGroup, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import FlatSpinner from '../spinners/FlatSpinner';
import styles from './FriendRequestButtons.module.css';

type Props = {
  id: string;
  onApprove: (userId?: string) => void;
  onDelete: (userId?: string) => void;
};

const FriendRequestButtons = ({ id, onApprove, onDelete }: Props) => {
  const [status, setStatus] = useState('default');

  const handleApprove = async () => {
    try {
      setStatus('submitting');
      await axios.post(`/api/user/friend-request/${id}/approve`);
      setStatus('approved');
      setTimeout(() => {
        onApprove(id);
      }, 2000);
    } catch (error) {
      setStatus('default');
      console.error(error);
      toast.error('Could not approve friend request!');
    }
  };

  const handleDelete = async () => {
    try {
      setStatus('submitting');
      await axios.delete(`/api/user/friend-request/${id}/delete`);
      setStatus('deleted');
      setTimeout(() => {
        onDelete(id);
      }, 2000);
    } catch (error) {
      setStatus('default');
      console.error(error);
      toast.error('Could not delete friend request!');
    }
  };

  const buttons = () => {
    switch (status) {
      case 'submitting':
        return <FlatSpinner size="20" />;
      case 'approved':
        return (
          <p className="text-center mb-0">
            <i className="bi bi-check-lg" /> Approved!
          </p>
        );
      case 'deleted':
        return (
          <p className="text-center mb-0">
            <i className="bi bi-check-lg" /> Deleted!
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
  return <div>{buttons()}</div>;
};

export default FriendRequestButtons;
