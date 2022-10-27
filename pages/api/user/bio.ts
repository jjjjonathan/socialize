import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { body, validationResult } from 'express-validator';
import User from '../../../models/User';
import { authOptions } from '../auth/[...nextauth]';
import connectMongo from '../../../utils/connectMongo';

const router = nc<NextApiRequest, NextApiResponse>();

router.post(
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

export default router;
