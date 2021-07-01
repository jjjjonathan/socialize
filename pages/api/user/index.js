import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import middleware from '../../../middleware';
import User from '../../../models/User';

const handler = nc();
handler.use(middleware);

handler.post(async (req, res) => {
  const { name, email, username, password } = req.body;
  const userSince = new Date();
  const passwordHash = await bcrypt.hash(password, 11);

  const user = new User({
    name,
    email,
    username,
    passwordHash,
    userSince,
  });

  const savedUser = await user.save();
  return res.json(savedUser);
});

handler.get(async (req, res) => {
  if (!req.user) return res.json({ user: null });
  return res.json(req.user);
});

export default handler;
