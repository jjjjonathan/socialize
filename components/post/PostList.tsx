/* eslint-disable no-unused-vars */
import { SessionUser } from '../../types/misc';
import { NewsfeedRes } from '../../types/records';
import FlatAlert from '../ui/FlatAlert';
import PostCard from './PostCard';

type Props = {
  posts: NewsfeedRes[];
  updateLikes: (postId: string, likes: string[]) => void;
  currentUser: SessionUser;
  removePostFromList: (postId: string) => void;
};

const PostList = ({
  posts,
  updateLikes,
  currentUser,
  removePostFromList,
}: Props) => {
  if (posts.length === 0)
    return <FlatAlert className="text-center mt-3">No posts to show</FlatAlert>;

  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          updateLikes={updateLikes}
          currentUser={currentUser}
          removePostFromList={removePostFromList}
        />
      ))}
    </>
  );
};

export default PostList;
