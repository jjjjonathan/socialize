import Link from 'next/link';
import Image from './Image';
import useComments from '../hooks/useComments';
import FlatSpinner from './FlatSpinner';
import FlatAlert from './FlatAlert';

const Comments = ({ postId }) => {
  const { comments, isCommentsError, isCommentsLoading } = useComments(postId);

  const innards = () => {
    if (isCommentsLoading) return <FlatSpinner />;
    if (isCommentsError)
      return <FlatAlert type="error">Could not load comments</FlatAlert>;

    return comments.map((comment) => (
      <div key={comment.id}>
        <div className="d-flex align-items-center mb-2">
          <Image
            publicId={comment.user.profilePicture}
            size="30"
            variant="circle"
            profilePicName={comment.user.name}
            href={`/profile/${comment.user.username}`}
            layout="fixed"
          />
          <Link href={`/profile/${comment.user.username}`} passHref>
            <a className="ml-3 mb-1 text-dark">{comment.user.name}</a>
          </Link>
        </div>
        <div>{comment.body}</div>
      </div>
    ));
  };

  return <div className="d-flex align-items-center">{innards()}</div>;
};

export default Comments;
