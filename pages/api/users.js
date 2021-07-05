import nc from 'next-connect';
import middleware from '../../middleware';
import User from '../../models/User';

const handler = nc();
handler.use(middleware);

// TODO sort by newness

handler.get(async (req, res) => {
  const users = await User.find({}, '-friendRequests');
  return res.json(users);
});

export default handler;
