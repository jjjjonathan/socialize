import { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import toast from 'react-hot-toast';
import parse from 'html-react-parser';
import FlatSpinner from './spinners/FlatSpinner';
import { defaultDate } from '../utils/dateHelpers';
import Image from './ui/Image';
import styles from './Comment.module.css';

const Comment = ({ comment, currentUser, removeCommentFromList }) => {
  const [deleting, setDeleting] = useState(false);

  const isOwnComment = comment.user.id === currentUser.id;

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/comment/${comment.id}/delete`);
      removeCommentFromList(comment.id);
      toast.success('Comment deleted!');
    } catch (error) {
      setDeleting(false);
      console.error(error);
      toast.error('Could not delete comment!');
    }
  };

  const deleteButton = () => {
    if (deleting)
      return (
        <div className="ml-auto" style={{ position: 'relative', top: -8 }}>
          <FlatSpinner size="15" color="danger" />
        </div>
      );

    return (
      <Button
        className="ml-auto circle-button-small"
        variant="outline-danger"
        onClick={handleDelete}
      >
        <i className="bi bi-trash"></i>
      </Button>
    );
  };

  return (
    <div className="w-100 d-flex mt-3">
      <Image
        publicId={comment.user.profilePicture}
        size="32"
        variant="circle"
        profilePicName={comment.user.name}
        href={`/profile/${comment.user.username}`}
        layout="fixed"
      />
      <div
        className={`d-flex w-100 ml-2 px-3 pt-2 pb-3 bg-light ${styles.body}`}
      >
        <div>
          <div>
            <Link href={`/profile/${comment.user.username}`} passHref>
              <a className={`h6 mb-1 text-dark ${styles.name}`}>
                {comment.user.name}
              </a>
            </Link>
            <span className="text-muted small">
              {' '}
              posted {defaultDate(comment.timestamp)}
            </span>
          </div>
          <p className="mb-0 medium">{parse(comment.body)}</p>
        </div>
        {isOwnComment && deleteButton()}
      </div>
    </div>
  );
};

export default Comment;
