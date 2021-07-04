import Alert from './Alert';
import PostCard from './PostCard';

const Newsfeed = ({ posts }) => {
  if (posts.length === 0) return <Alert>No posts to show</Alert>;

  return (
    <>
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </>
  );
};

export default Newsfeed;
