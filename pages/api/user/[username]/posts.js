import nc from 'next-connect';
import User from '../../../../models/User';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]';
import connectMongo from '../../../../utils/connectMongo';

const handler = nc().get(async (req, res) => {
  await connectMongo();

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();

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

export default handler;
