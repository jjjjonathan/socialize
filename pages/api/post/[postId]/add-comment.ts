import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { body as validate, validationResult } from 'express-validator';
import Comment from '../../../../models/Comment';
import { authOptions } from '../../auth/[...nextauth]';
import connectMongo from '../../../../utils/connectMongo';

const router = nc<NextApiRequest, NextApiResponse>();

router.post(
  validate('body')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Comments must be between 1 and 1000 characters')
    .escape(),

  async (req, res) => {
    await connectMongo();

    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) return res.status(401).end();

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400);

    const { postId } = req.query;
    const userId = session.user.id;
    const { body } = req.body;

    const comment = new Comment({
      body,
      post: postId,
      user: userId,
    });

    await comment.save();

    const populatedComment = await comment.populate(
      'user',
      'name username profilePicture',
    );

    return res.json(populatedComment);
  },
);

export default router;
