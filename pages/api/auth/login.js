import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import middleware from '../../../middleware';
import User from '../../../models/User';

import passport from '../../../middleware/passport';

const handler = nc();

handler.use(middleware);

handler.use(passport.authenticate('local'));
handler.post((req, res) => {
  res.json({ user: req.user });
});

export default handler;
