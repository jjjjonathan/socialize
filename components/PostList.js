import FlatAlert from './FlatAlert';
import PostCard from './PostCard';

const PostList = ({ posts }) => {
  if (posts.length === 0)
    return <FlatAlert className="text-center mt-3">No posts to show</FlatAlert>;

  return (
    <>
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </>
  );
};

export default PostList;
