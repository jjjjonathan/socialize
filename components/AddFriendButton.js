import { Button } from 'react-bootstrap';
import styles from './AddFriendButton.module.css';

const AddFriendButton = ({ variant, className, ...props }) => {
  if (variant === 'mini') {
    return (
      <Button
        variant="outline-secondary"
        className={`${className} ${styles.mini}`}
        {...props}
      >
        <i className="bi bi-person-plus-fill"></i>
      </Button>
    );
  }

  return (
    <Button
      variant="secondary"
      className={`${className} ${styles.large}`}
      {...props}
    >
      <i className="bi bi-person-plus"></i> Add Friend
    </Button>
  );
};

export default AddFriendButton;
