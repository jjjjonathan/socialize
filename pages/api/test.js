import nc from 'next-connect';
import middleware from '../../middleware';
import User from '../../models/User';

const handler = nc();
handler.use(middleware);

handler.get(async (req, res) => {
  const users = await User.find({}, 'username requestedFriends').populate(
    'requestedFriends',
  );
  return res.json(users);
});

export default handler;
