import { Card } from 'react-bootstrap';
import Link from 'next/link';
import Image from './Image';
import { defaultDate } from '../utils/dateHelpers';
import styles from './PostCard.module.css';

const PostCard = ({ post }) => (
  <Card className="glass-card mb-4">
    <Card.Header>
      <div className="d-flex align-items-center">
        <Image
          publicId={post.user.profilePicture}
          size="30"
          variant="circle"
          profilePicName={post.user.name}
          href={`/profile/${post.user.username}`}
        />
        <div className="ml-2 mb-1">
          <Link href={`/profile/${post.user.username}`} passHref>
            <a className={`h6 text-dark ${styles.name}`}>{post.user.name}</a>
          </Link>
          <span className="text-muted medium">
            {' '}
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
