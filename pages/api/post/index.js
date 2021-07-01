import nc from 'next-connect';
import middleware from '../../../middleware';
import Post from '../../../models/Post';

const handler = nc();
handler.use(middleware);

handler.post(async (req, res) => {
  if (!req.user) return res.status(401).end();

  const { body } = req.body;
  const timestamp = new Date();
  const user = req.user.id;

  const post = new Post({
    body,
    timestamp,
    user,
  });

  const savedPost = await post.save();
  return res.json(savedPost);
});

export default handler;
