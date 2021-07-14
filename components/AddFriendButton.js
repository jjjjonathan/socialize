import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from './AddFriendButton.module.css';
import CircleSpinner from './CircleSpinner';

const AddFriendButton = ({ username, variant, onRemove, ...props }) => {
  const [status, setStatus] = useState('default');

  const onClick = async () => {
    try {
      setStatus('submitting');
      await axios.post(`/api/user/${username}/add-friend`);
      setStatus('success');
      setTimeout(() => {
        onRemove(username);
      }, 2000);
    } catch (error) {
      // TODO add error message
      console.error(error);
    }
  };

  if (variant === 'mini') {
    const innards = () => {
      switch (status) {
        case 'submitting':
          return <CircleSpinner size="25" color="secondary" />;
        case 'success':
          return <i className="bi bi-check-lg text-secondary"></i>;
        default:
          return (
            <Button
              onClick={onClick}
              variant="outline-secondary"
              className={styles.mini}
            >
              <i className="bi bi-person-plus-fill"></i>
            </Button>
          );
      }
    };

    return (
      <div
        {...props}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
        }}
      >
        {innards()}
      </div>
    );
  }

  return (
    <div {...props}>
      <Button onClick={onClick} variant="secondary" className={styles.large}>
        <i className="bi bi-person-plus"></i> Add Friend
      </Button>
    </div>
  );
};

export default AddFriendButton;
