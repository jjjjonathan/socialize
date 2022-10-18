import FlatAlert from './ui/FlatAlert';
import PostCard from './post/PostCard';

const PostList = ({ posts, updateLikes, currentUser, removePostFromList }) => {
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
