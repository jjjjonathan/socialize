import nc from 'next-connect';
import middleware from '../../../../middleware';
import Comment from '../../../../models/Comment';

const handler = nc();
handler.use(middleware);

handler.get(async (req, res) => {
  // if (!req.user) return res.status(401).end();

  const { postId } = req.query;

  const comments = await Comment.find({ post: postId }, '-post').populate(
    'user',
    'name username profilePicture',
  );
  return res.json(comments);
});

export default handler;
