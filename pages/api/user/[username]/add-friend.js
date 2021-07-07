import nc from 'next-connect';
import middleware from '../../../../middleware';
import User from '../../../../models/User';

const handler = nc();
handler.use(middleware);

handler.post(async (req, res) => {
  if (!req.user) return res.status(401).end();

  const { username } = req.query;
  const userToAdd = await User.findOne({ username });

  if (!userToAdd || req.user.username === username)
    return res.status(400).end();

  userToAdd.friendRequests.push(req.user.id);

  const response = await userToAdd.save();
  return res.json(response);
});

export default handler;
