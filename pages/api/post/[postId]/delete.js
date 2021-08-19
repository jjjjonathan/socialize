import nc from 'next-connect';
import middleware from '../../../../middleware';
import Post from '../../../../models/Post';
import Comment from '../../../../models/Comment';

const handler = nc();
handler.use(middleware);

handler.delete(async (req, res) => {
  if (!req.user) return res.status(401).end();

  const { postId } = req.query;

  await Post.findByIdAndDelete(postId);
  await Comment.deleteMany({ post: postId });

  return res.status(204).end();
});

export default handler;
