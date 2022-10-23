import React from 'react';
import FlatSpinner from '../spinners/FlatSpinner';
import FlatAlert from '../ui/FlatAlert';
import Comment from './Comment';
import { CommentRes } from '../../types/records';
import { SessionUser } from '../../types/misc';

type Props = {
  comments: CommentRes[];
  isCommentsLoading: boolean;
  isCommentsError: any;
  setComments: (comments: CommentRes[]) => void;
  currentUser: SessionUser;
  decreaseCommentCount: () => void;
};

const Comments = ({
  comments,
  isCommentsLoading,
  isCommentsError,
  setComments,
  currentUser,
  decreaseCommentCount,
}: Props) => {
  const removeCommentFromList = (commentId: string) => {
    const nextState = comments.filter((comment) => comment.id !== commentId);
    setComments(nextState);
    decreaseCommentCount();
  };

  if (isCommentsLoading)
    return (
      <div className="mt-4 d-flex justify-content-center">
        <FlatSpinner />
      </div>
    );
  if (isCommentsError)
    return (
      <div className="mt-4 text-center">
        <FlatAlert type="error">Could not load comments</FlatAlert>
      </div>
    );

  return (
    <div>
      {comments.map((comment) => (
        <Comment
          comment={comment}
          currentUser={currentUser}
          removeCommentFromList={removeCommentFromList}
          key={comment.id}
        />
      ))}
    </div>
  );
};

export default Comments;
