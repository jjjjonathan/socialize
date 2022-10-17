import { Modal } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect } from 'react';
import Image from './ui/Image';
import useLikes from '../hooks/useLikes';
import CircleSpinner from './spinners/CircleSpinner';
import FlatAlert from './ui/FlatAlert';
import styles from './LikesModal.module.css';

const LikesModal = ({ postId, setShow, show }) => {
  const { likes, isLikesError, isLikesLoading, setLikes } = useLikes(postId);

  useEffect(() => {
    if (show === true) {
      setLikes();
    }
  }, [show]);

  const innards = () => {
    if (isLikesLoading) return <CircleSpinner />;
    if (isLikesError)
      return <FlatAlert type="error">Could not load likes</FlatAlert>;

    return (
      <ul>
        {likes.map((like) => (
          <div className="d-flex align-items-center mb-2" key={like.id}>
            <Image
              publicId={like.profilePicture}
              size="40"
              variant="circle"
              profilePicName={like.name}
              href={`/profile/${like.username}`}
              layout="fixed"
            />
            <Link href={`/profile/${like.username}`} passHref>
              <a className={`h6 ml-3 mb-1 text-secondary ${styles.name}`}>
                {like.name}
              </a>
            </Link>
          </div>
        ))}
      </ul>
    );
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Likes</Modal.Title>
      </Modal.Header>
      <Modal.Body>{innards()}</Modal.Body>
    </Modal>
  );
};

export default LikesModal;
