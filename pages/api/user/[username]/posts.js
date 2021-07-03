import nc from 'next-connect';
import middleware from '../../../../middleware';
import User from '../../../../models/User';

const handler = nc();
handler.use(middleware);

handler.get(async (req, res) => {
  const { username } = req.query;

  const posts = await User.findOne({ username }, 'posts').populate(
    'posts',
    'body likes timestamp -user',
  );
  res.json(posts);
});

export default handler;
