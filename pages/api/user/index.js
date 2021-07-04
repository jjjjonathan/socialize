import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import handler from '../../../middleware';
import User from '../../../models/User';

handler.post(
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .escape(),

  body('email')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Email must be between 5 and 100 characters')
    .isEmail()
    .withMessage('Email must be in a valid format')
    .escape(),

  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .escape(),

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
  },
);

handler.get(async (req, res) => {
  if (!req.user) return res.json({ user: null });
  return res.json(req.user);
});

export default handler;
