import { body, validationResult } from 'express-validator';
import nc from 'next-connect';
import middleware from '../../../middleware';
import User from '../../../models/User';

const handler = nc();
handler.use(middleware);

handler.post(
  body('bio')
    .trim()
    .isLength({ min: 3, max: 1000 })
    .withMessage('About Me must be between 3 and 1000 characters')
    .escape(),

  async (req, res) => {
    if (!req.user) return res.status(401).end();

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400);

    const { id } = req.user;
    const { bio } = req.body;

    await User.findByIdAndUpdate(id, { bio });

    return res.status(204).end();
  },
);

export default handler;
