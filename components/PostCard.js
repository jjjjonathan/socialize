import { ButtonGroup, Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import Image from './Image';
import { defaultDate } from '../utils/dateHelpers';
import styles from './PostCard.module.css';

const PostCard = ({ post }) => {
  const handleLike = () => {
    console.log('liking post id ', post.id);
  };

  return (
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
        <hr />
        <div className="d-flex medium">
          <div>{post.likes.length} Likes</div>
          <div className="ml-auto">0 Comments</div>
        </div>
        {/* <Card.Img variant="bottom" src="https://via.placeholder.com/150" /> */}
      </Card.Body>
      <Card.Footer className="p-0">
        <ButtonGroup className={styles.footerButtonGroup}>
          <Button
            variant="outline-dark"
            className={`py-2 ${styles.footerButtonLeft}`}
            onClick={handleLike}
          >
            Like
          </Button>
          <Button
            variant="outline-dark"
            className={`py-2 ${styles.footerButtonRight}`}
          >
            Comment
          </Button>
        </ButtonGroup>
      </Card.Footer>
    </Card>
  );
};

export default PostCard;
