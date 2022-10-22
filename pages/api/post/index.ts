import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { body, validationResult } from 'express-validator';
import Post from '../../../models/Post';
import { authOptions } from '../auth/[...nextauth]';
import connectMongo from '../../../utils/connectMongo';

const router = nc<NextApiRequest, NextApiResponse>();

router.post(
  body('body')
    .trim()
    .isLength({ min: 3, max: 2000 })
    .withMessage('Posts must be between 3 and 2000 characters')
    .escape(),

  async (req, res) => {
    await connectMongo();

    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) return res.status(401).end();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const postBody = req.body.body;
    const user = session.user.id;

    const post = new Post({
      body: postBody,
      user,
    });

    const savedPost = await post.save();
    const populatedPost = await savedPost.populate(
      'user',
      'name username profilePicture',
    );

    return res.json(populatedPost);
  },
);

export default router;
