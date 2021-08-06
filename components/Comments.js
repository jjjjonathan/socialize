import Link from 'next/link';
import Image from './Image';
import useComments from '../hooks/useComments';
import FlatSpinner from './FlatSpinner';
import FlatAlert from './FlatAlert';
import { defaultDate } from '../utils/dateHelpers';
import styles from './Comments.module.css';

const Comments = ({ postId }) => {
  const { comments, isCommentsError, isCommentsLoading } = useComments(postId);

  if (isCommentsLoading)
    return (
      <div className="d-flex justify-content-center">
        <FlatSpinner />
      </div>
    );
  if (isCommentsError)
    return (
      <div className="text-center">
        <FlatAlert type="error">Could not load comments</FlatAlert>
      </div>
    );

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id} className="w-100 d-flex mt-3">
          <Image
            publicId={comment.user.profilePicture}
            size="32"
            variant="circle"
            profilePicName={comment.user.name}
            href={`/profile/${comment.user.username}`}
            layout="fixed"
          />
          <div className={`w-100 ml-2 px-3 pt-2 pb-3 bg-light ${styles.body}`}>
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
            <p className="mb-0 medium">{comment.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
