import { Modal } from 'react-bootstrap';
import useLikes from '../hooks/useLikes';
import CircleSpinner from './CircleSpinner';
import FlatAlert from './FlatAlert';

const LikesModal = ({ postId, setShow, show }) => {
  const { likes, isLikesError, isLikesLoading } = useLikes(postId);

  const innards = () => {
    if (isLikesLoading) return <CircleSpinner />;
    if (isLikesError)
      return <FlatAlert type="error">Could not load likes</FlatAlert>;

    console.log('likes', likes);
    return (
      <ul>
        {likes.map((like) => (
          <li key={like.id}>{like.name}</li>
        ))}
      </ul>
    );
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton />
      <Modal.Body>{innards()}</Modal.Body>
    </Modal>
  );
};

export default LikesModal;
