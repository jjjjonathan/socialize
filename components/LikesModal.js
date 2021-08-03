import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import useLikes from '../hooks/useLikes';

const LikesModal = ({ postId }) => {
  const [showModal, setShowModal] = useState(false);
  const { likes, isLikesError, isLikesLoading, setLikes } = useLikes(postId);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
    </Modal>
  );
};

export default LikesModal;
