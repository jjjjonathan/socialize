import Link from 'next/link';
import { Card } from 'react-bootstrap';
import Image from './ui/Image';
import styles from './NewUsers.module.css';

const FriendsList = ({ friends }) => (
  <Card className="gradient-glass-card mb-5">
    <Card.Header>
      <h4 className="h5 mb-0">Friends</h4>
    </Card.Header>
    <Card.Body>
      {friends.map((friend) => (
        <div className="d-flex align-items-center mb-2" key={friend.id}>
          <Image
            publicId={friend.user.profilePicture}
            size="40"
            variant="circle"
            profilePicName={friend.user.name}
            href={`/profile/${friend.user.username}`}
          />
          <Link href={`/profile/${friend.user.username}`} passHref>
            <a className={`h6 ml-3 mb-0 text-secondary ${styles.name}`}>
              {friend.user.name}
            </a>
          </Link>
        </div>
      ))}
    </Card.Body>
  </Card>
);

export default FriendsList;
