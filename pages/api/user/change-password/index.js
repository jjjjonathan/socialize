import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import nc from 'next-connect';
import middleware from '../../../../middleware';
import User from '../../../../models/User';

const handler = nc();
handler.use(middleware);

handler.post(
  body('password')
    .isLength({ min: 8, max: 40 })
    .withMessage('Password must be between 8 and 40 characters'),

  body('passwordConf').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords must match');
    }
    return true;
  }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 11);

    await User.findOneAndUpdate({ email }, { passwordHash });

    return res.status(202).end();
  },
);

export default handler;
