import PostCard from './PostCard';

const Newsfeed = ({ posts }) => (
  <>
    {posts.map((post, index) => (
      <PostCard key={index} post={post} />
    ))}
  </>
);

export default Newsfeed;
