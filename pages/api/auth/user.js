import nc from 'next-connect';
import middleware from '../../../middleware';
import User from '../../../models/User';

const handler = nc();

handler.use(middleware);

handler.post(async (req, res) => {
  const { name, username } = req.body;

  const user = new User({
    name,
    username,
  });

  const savedUser = await user.save();
  return res.json(savedUser);
});

handler.get(async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

export default handler;
