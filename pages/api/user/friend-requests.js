import nc from 'next-connect';
import middleware from '../../../middleware';
import User from '../../../models/User';

const handler = nc();
handler.use(middleware);

handler.get(async (req, res) => {
  if (!req.user) return res.status(401).end();

  const { id } = req.user;
  const user = await User.findById(id, 'friendRequests').populate(
    'friendRequests.user',
    'name username profilePicture',
  );

  return res.json(user);
});

export default handler;
