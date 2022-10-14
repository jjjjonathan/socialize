import { body, validationResult } from 'express-validator';
import nc from 'next-connect';
import User from '../../../models/User';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';
import connectMongo from '../../../utils/connectMongo';

const handler = nc().post(
  body('bio')
    .trim()
    .isLength({ min: 3, max: 1000 })
    .withMessage('About Me must be between 3 and 1000 characters')
    .escape(),

  async (req, res) => {
    await connectMongo();

    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) return res.status(401).end();

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400);

    const { id } = session.user;
    const { bio } = req.body;

    await User.findByIdAndUpdate(id, { bio });

    return res.status(204).end();
  },
);

export default handler;
