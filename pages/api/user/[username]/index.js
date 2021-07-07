import nc from 'next-connect';
import middleware from '../../../../middleware';
import User from '../../../../models/User';

const handler = nc();
handler.use(middleware);

handler.get(async (req, res) => {
  const { username } = req.query;

  // const user = await User.findOne({ username }, '-friendRequests');
  // Temporarily verifying friend requests
  const user = await User.findOne({ username }).populate('friendRequests');

  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json(user);
});

export default handler;
