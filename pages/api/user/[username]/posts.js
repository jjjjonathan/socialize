import nc from 'next-connect';
import middleware from '../../../../middleware';
import User from '../../../../models/User';

const handler = nc();
handler.use(middleware);

handler.get(async (req, res) => {
  const { username } = req.query;

  const posts = await User.findOne({ username }, 'posts').populate({
    path: 'posts',
    populate: {
      path: 'user',
      select: 'name username profilePicture',
    },
  });
  if (!posts) return res.status(404).json({ error: 'User not found' });
  return res.json(posts);
});

export default handler;
