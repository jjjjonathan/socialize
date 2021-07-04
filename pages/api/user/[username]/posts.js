import handler from '../../../../middleware';
import User from '../../../../models/User';

handler.get(async (req, res) => {
  const { username } = req.query;

  const posts = await User.findOne({ username }, 'posts').populate({
    path: 'posts',
    populate: {
      path: 'user',
      select: 'name username',
    },
  });
  if (!posts) return res.status(404).json({ error: 'User not found' });
  return res.json(posts);
});

export default handler;
