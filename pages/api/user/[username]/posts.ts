/* eslint-disable consistent-return */
/* eslint-disable no-console */
import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../../models/User';
import connectMongo from '../../../../utils/connectMongo';

const router = nc<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  try {
    await connectMongo();
    console.log('mongo connected');

    const { username } = req.query;
    console.log('username', username);

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
    console.log('posts', posts);
    console.log('json posts', JSON.stringify(posts));

    if (!posts) return res.status(404).json({ error: 'User not found' });

    return res.json(posts);
  } catch (err) {
    console.error(err);
  }
});

export default router;
