import { useEffect, useState } from 'react';
import { ButtonGroup, Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import Image from './Image';
import { defaultDate } from '../utils/dateHelpers';
import styles from './PostCard.module.css';
import FlatSpinner from './FlatSpinner';
import LikesModal from './LikesModal';

const PostCard = ({ post, updateLikes, currentUser }) => {
  const [likeStatus, setLikeStatus] = useState('default');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (post.likes.find((like) => like === currentUser.id)) {
      setLikeStatus('liked');
    }
  }, [post]);

  const handleLike = async () => {
    if (likeStatus === 'default') {
      try {
        setLikeStatus('liking');
        const { data } = await axios.post(`/api/post/${post.id}/like`);
        updateLikes(post.id, data.likes);
        setLikeStatus('liked');
      } catch (error) {
        setLikeStatus('default');
        console.error(error);
        toast.error('Could not like post!');
      }
    } else if (likeStatus === 'liked') {
      try {
        setLikeStatus('liking');
        const { data } = await axios.post(`/api/post/${post.id}/like`);
        updateLikes(post.id, data.likes);
        setLikeStatus('default');
      } catch (error) {
        setLikeStatus('liked');
        console.error(error);
        toast.error('Could not unlike post!');
      }
    }
  };

  const likeButtonInnards = () => {
    switch (likeStatus) {
      case 'liking':
        return <FlatSpinner size="15" />;
      case 'liked':
        return 'Unlike';
      default:
        return 'Like';
    }
  };

  return (
    <>
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
                <a className={`h6 text-dark ${styles.name}`}>
                  {post.user.name}
                </a>
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
            <a
              className={`text-dark ${styles.likeCount}`}
              onClick={() => setShowModal(true)}
            >
              {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
            </a>
            <div className="ml-auto">0 Comments</div>
          </div>
        </Card.Body>
        <Card.Footer className="p-0">
          <ButtonGroup className={styles.footerButtonGroup}>
            <Button
              variant="outline-dark"
              className={`py-2 ${styles.footerButtonLeft}`}
              onClick={handleLike}
              disabled={likeStatus === 'liking'}
            >
              {likeButtonInnards()}
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
      <LikesModal postId={post.id} setShow={setShowModal} show={showModal} />
    </>
  );
};

export default PostCard;
