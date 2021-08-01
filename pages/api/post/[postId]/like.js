import nc from 'next-connect';
import middleware from '../../../../middleware';
import Post from '../../../../models/Post';

const handler = nc();
handler.use(middleware);

handler.post(async (req, res) => {
  if (!req.user) return res.status(401).end();

  const { postId } = req.query;
  const userId = req.user.id;

  const post = await Post.findById(postId);

  const likeIndex = post.likes.findIndex(
    (like) => like.toString() === userId.toString(),
  );

  if (likeIndex !== -1) {
    post.likes.splice(likeIndex, 1);
  } else {
    post.likes.push(userId);
  }

  await post.save();

  return res.json(post);
});

export default handler;
