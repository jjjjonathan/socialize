import nc from 'next-connect';
import middleware from '../../../../middleware';
import Comment from '../../../../models/Comment';

const handler = nc();
handler.use(middleware);

handler.delete(async (req, res) => {
  if (!req.user) return res.status(401).end();

  const { commentId } = req.query;

  await Comment.findByIdAndDelete(commentId);

  return res.status(204).end();
});

export default handler;
