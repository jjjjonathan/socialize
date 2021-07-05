import { Card } from 'react-bootstrap';
import Image from 'next/image';
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
        <h4 className={`h6 ml-2 pt-2 ${styles.name}`}>{post.user.name}</h4>
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
