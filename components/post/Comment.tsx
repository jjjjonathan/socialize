import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import toast from 'react-hot-toast';
import parse from 'html-react-parser';
import { defaultDate } from '../../utils/dateHelpers';
import FlatSpinner from '../spinners/FlatSpinner';
import Image from '../ui/Image';
import { CommentRes } from '../../types/records';
import { SessionUser } from '../../types/misc';

const Body = styled.div`
  border-radius: 10px;
`;

const NameAnchor = styled.a`
  font-weight: 700;
  font-size: 0.87em;
`;

type Props = {
  comment: CommentRes;
  currentUser: SessionUser;
  removeCommentFromList: (id: string) => void;
};

const Comment = ({ comment, currentUser, removeCommentFromList }: Props) => {
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
        <i className="bi bi-trash" />
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
      <Body className="d-flex w-100 ml-2 px-3 pt-2 pb-3 bg-light">
        <div>
          <div>
            <Link href={`/profile/${comment.user.username}`} passHref>
              <NameAnchor className="h6 mb-1 text-dark">
                {comment.user.name}
              </NameAnchor>
            </Link>
            <span className="text-muted small">
              {' '}
              posted {defaultDate(comment.timestamp)}
            </span>
          </div>
          <p className="mb-0 medium">{parse(comment.body)}</p>
        </div>
        {isOwnComment && deleteButton()}
      </Body>
    </div>
  );
};

export default Comment;
