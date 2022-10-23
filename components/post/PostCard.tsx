import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ButtonGroup, Button, Card, Collapse, Form } from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Formik, Form as FormikForm, FormikHelpers } from 'formik';
import TextareaAutosize from 'react-textarea-autosize';
import * as yup from 'yup';
import parse from 'html-react-parser';
import { defaultDate } from '../../utils/dateHelpers';
import useComments from '../../hooks/useComments';
import { NewsfeedRes } from '../../types/records';
import { SessionUser } from '../../types/misc';
import Image from '../ui/Image';
import FlatSpinner from '../spinners/FlatSpinner';
import LikesModal from './LikesModal';
import Comments from './Comments';

const FooterButtons = styled(ButtonGroup)`
  width: 100%;
  height: 38px;

  button {
    width: 50%;
    font-size: 0.85em;
    border-width: 0;

    &.left {
      border-top-left-radius: 0;
      border-bottom-left-radius: 15px;
      border-right-width: 3px;
      border-right-color: white;
    }

    &.right {
      border-top-right-radius: 0;
      border-bottom-right-radius: 15px;
      transition: border-bottom-right-radius 0.2s;
    }

    &.open {
      border-radius: 0 !important;
      transition: border-radius 0.2s;
    }
  }
`;

type LikeStatus = 'default' | 'liking' | 'liked';

type Props = {
  post: NewsfeedRes;
  updateLikes: (postId: string, likes: string[]) => void;
  currentUser: SessionUser;
  removePostFromList: (postId: string) => void;
};

const PostCard = ({
  post,
  updateLikes,
  currentUser,
  removePostFromList,
}: Props) => {
  const [likeStatus, setLikeStatus] = useState<LikeStatus>('default');
  const [showModal, setShowModal] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [newCommentOpen, setNewCommentOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const { comments, isCommentsError, isCommentsLoading, setComments } =
    useComments(post.id);

  useEffect(() => {
    if (post.likes.find((like) => like === currentUser.id)) {
      setLikeStatus('liked');
    }
    setCommentCount(post.commentCount);
  }, []);

  const isOwnPost = post.user.id === currentUser.id;

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

  type NewCommentValues = { newComment: string };

  const handleNewComment = async (
    { newComment }: NewCommentValues,
    { resetForm }: FormikHelpers<NewCommentValues>,
  ) => {
    try {
      const response = await axios.post(`/api/post/${post.id}/add-comment`, {
        body: newComment,
      });
      const savedComment = response.data;

      setNewCommentOpen(false);
      setCommentCount(commentCount + 1);
      setComments([...comments!, savedComment]);
      setCommentsOpen(true);
      resetForm();

      toast.success('Comment added!');
    } catch (error) {
      console.error(error);
      toast.error('Could not add new comment!');
    }
  };

  const handleDeletePost = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/post/${post.id}/delete`);
      removePostFromList(post.id);
      toast.success('Post deleted!');
    } catch (error) {
      setDeleting(false);
      console.error(error);
      toast.error('Could not delete post!');
    }
  };

  const validationSchema = yup.object().shape({
    newComment: yup
      .string()
      .label('Your comment')
      .min(1)
      .max(1000)
      .required('Your comment cannot be empty'),
  });

  const likeText = () => {
    if (post.likes.length > 0)
      return (
        <button
          type="button"
          className="btn btn-link text-dark rounded-sm p-0 mb-1 text-button"
          onClick={() => setShowModal(true)}
        >
          {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
        </button>
      );

    return <p className="text-dark mb-0">0 Likes</p>;
  };

  const commentText = () => {
    if (commentCount > 0)
      return (
        <button
          type="button"
          className="ml-auto btn btn-link text-dark rounded-sm p-0 mb-1 text-button"
          onClick={() => setCommentsOpen(!commentsOpen)}
          aria-expanded={commentsOpen}
          aria-controls="collapse-comments"
        >
          {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
        </button>
      );

    return <p className="ml-auto text-dark mb-0">0 Comments</p>;
  };

  const likeButtonInnards = () => {
    switch (likeStatus) {
      case 'liking':
        return (
          <div style={{ position: 'relative', top: -8 }}>
            <FlatSpinner size="15" />
          </div>
        );
      case 'liked':
        return 'Unlike';
      default:
        return 'Like';
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
        onClick={handleDeletePost}
      >
        <i className="bi bi-trash" />
      </Button>
    );
  };

  return (
    <Formik
      initialValues={{ newComment: '' }}
      validationSchema={validationSchema}
      onSubmit={handleNewComment}
    >
      {({ isSubmitting, errors, touched, values, handleChange }) => (
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
                    <a className="h6 text-dark font-weight-bold">
                      {post.user.name}
                    </a>
                  </Link>
                  <span className="text-muted medium">
                    {' '}
                    posted {defaultDate(post.timestamp)}
                  </span>
                </div>
                {isOwnPost && deleteButton()}
              </div>
            </Card.Header>
            <Card.Body>
              <div>{parse(post.body)}</div>
              <hr />
              <div className="d-flex medium">
                {likeText()}
                {commentText()}
              </div>
              {commentCount ? (
                <Collapse in={commentsOpen}>
                  <div id="collapse-comments">
                    <Comments
                      comments={comments || []}
                      isCommentsError={isCommentsError}
                      isCommentsLoading={isCommentsLoading}
                      setComments={setComments}
                      currentUser={currentUser}
                      decreaseCommentCount={() =>
                        setCommentCount(commentCount - 1)
                      }
                    />
                  </div>
                </Collapse>
              ) : null}
            </Card.Body>
            <Card.Footer className="p-0">
              <FooterButtons>
                <Button
                  variant="outline-dark"
                  className={`py-2 left ${newCommentOpen ? 'open' : ''}`}
                  onClick={handleLike}
                  disabled={likeStatus === 'liking'}
                >
                  {likeButtonInnards()}
                </Button>
                <Button
                  variant="outline-dark"
                  className={`py-2 right ${newCommentOpen ? 'open' : ''}`}
                  onClick={() => setNewCommentOpen(!newCommentOpen)}
                  aria-expanded={newCommentOpen}
                  aria-controls="collapse-add-new-comment"
                >
                  Comment
                </Button>
              </FooterButtons>
              <Collapse in={newCommentOpen}>
                <div id="collapse-add-new-comment">
                  <FormikForm noValidate>
                    <Form.Control
                      as={TextareaAutosize}
                      minRows={3}
                      maxRows={12}
                      className={`comment-textarea ${
                        errors.newComment && touched.newComment
                          ? 'is-invalid'
                          : null
                      }`}
                      placeholder="Add new comment..."
                      name="newComment"
                      value={values.newComment}
                      onChange={handleChange}
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="new-post-submit-button"
                      style={{
                        width: 38,
                        height: 24,
                        boxSizing: 'content-box',
                      }}
                    >
                      {isSubmitting ? (
                        <FlatSpinner
                          size="18"
                          style={{ marginTop: '-3px', marginLeft: '-8px' }}
                        />
                      ) : (
                        'Post'
                      )}
                    </Button>
                  </FormikForm>
                </div>
              </Collapse>
            </Card.Footer>
          </Card>
          {errors.newComment && touched.newComment ? (
            <div className="invalid-feedback new-post-validation-error">
              {errors.newComment}
            </div>
          ) : null}
          <LikesModal
            postId={post.id}
            setShow={setShowModal}
            show={showModal}
          />
        </>
      )}
    </Formik>
  );
};

export default PostCard;
