import nc from 'next-connect';
import middleware from '../../../../middleware';
import Comment from '../../../../models/Comment';

const handler = nc();
handler.use(middleware);

handler.post(async (req, res) => {
  if (!req.user) return res.status(401).end();
  if (!req.body?.body) return res.status(400).end();

  const { postId } = req.query;
  const userId = req.user.id;
  const { body } = req.body;

  const comment = new Comment({
    body,
    post: postId,
    user: userId,
  });

  await comment.save();

  const populatedComment = await comment
    .populate('user', 'name username profilePicture')
    .execPopulate();

  return res.json(populatedComment);
});

export default handler;
