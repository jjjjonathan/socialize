import { Card } from 'react-bootstrap';
import Image from 'next/image';
import { defaultDate } from '../utils/dateHelpers';
import styles from './PostCard.module.css';

const PostCard = ({ post }) => (
  <Card className="glass-card mb-4">
    <Card.Header>
      <div className="d-flex align-items-center">
        <Image
          src={post.user.profilePicture}
          height="30"
          width="30"
          alt={`Profile picture of ${post.user.name}`}
        />
        <div className="ml-2 pt-2">
          <span className={`h6 ${styles.name}`}>{post.user.name} </span>
          <span className="text-muted medium">
            posted {defaultDate(post.timestamp)}
          </span>
        </div>
      </div>
    </Card.Header>
    <Card.Body>
      {post.body}
      {/* <Card.Img variant="bottom" src="https://via.placeholder.com/150" /> */}
    </Card.Body>
    <Card.Footer>{post.likes.length} Likes</Card.Footer>
  </Card>
);

export default PostCard;
