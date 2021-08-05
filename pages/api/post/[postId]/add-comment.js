import nc from 'next-connect';
import middleware from '../../../../middleware';
import Comment from '../../../../models/Comment';

const handler = nc();
handler.use(middleware);

handler.post(async (req, res) => {
  if (!req.user) return res.status(401).end();

  const { postId } = req.query;
  const userId = req.user.id;
  const { body } = req;

  const comment = new Comment({
    body,
    post: postId,
    user: userId,
  });

  await comment.save();

  return res.json(comment);
});

export default handler;
