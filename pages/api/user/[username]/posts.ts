import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../../models/User';
import connectMongo from '../../../../utils/connectMongo';

const router = nc<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  await connectMongo();

  const { username } = req.query;

  const posts = await User.findOne({ username }, 'posts').populate({
    path: 'posts',
    options: {
      sort: '-timestamp',
    },
    populate: [
      {
        path: 'user',
        select: 'name username profilePicture',
      },
      { path: 'commentCount' },
    ],
  });

  if (!posts) return res.status(404).json({ error: 'User not found' });

  return res.json(posts);
});

export default router;
