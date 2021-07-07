import { Button } from 'react-bootstrap';
import styles from './AddFriendButton.module.css';

const AddFriendButton = ({ username, variant, className, ...props }) => {
  const onClick = () => {
    console.log(username);
  };

  if (variant === 'mini') {
    return (
      <Button
        onClick={onClick}
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
      onClick={onClick}
      variant="secondary"
      className={`${className} ${styles.large}`}
      {...props}
    >
      <i className="bi bi-person-plus"></i> Add Friend
    </Button>
  );
};

export default AddFriendButton;
