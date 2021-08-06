import Link from 'next/link';
import Image from './Image';
import useComments from '../hooks/useComments';

const Comments = ({ postId }) => {
  const { comments, isCommentsError, isCommentsLoading, setComments } =
    useComments(postId);

  return (
    <div>
      {comments.map((comment) => (
        <div className="d-flex align-items-center mb-2" key={comment.id}>
          <Image
            publicId={comment.profilePicture}
            size="40"
            variant="circle"
            profilePicName={comment.name}
            href={`/profile/${comment.username}`}
            layout="fixed"
          />
          <Link href={`/profile/${comment.username}`} passHref>
            <a className={`h6 ml-3 mb-1 text-dark`}>{comment.name}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Comments;
