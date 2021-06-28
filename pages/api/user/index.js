import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import middleware from '../../../middleware';
import User from '../../../models/User';

const handler = nc();

handler.use(middleware);

handler.post(async (req, res) => {
  const { name, email, username, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 11);

  const user = new User({
    name,
    email,
    username,
    passwordHash,
  });

  const savedUser = await user.save();
  return res.json(savedUser);
});

// this is for testing, if needed, move to api/users.js
handler.get(async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

export default handler;
