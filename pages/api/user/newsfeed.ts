import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/User';
import Post from '../../../models/Post';

const router = nc<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  await connectMongo();

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();

  const { id } = session.user;
  const user = await User.findById(id, 'friends');

  if (!user) return res.status(401).end();

  const friendIds = user.friends.map((friend) => friend.user);
  const allIds = [...friendIds, id];

  const posts = await Post.find({
    user: {
      $in: allIds,
    },
  })
    .populate('commentCount')
    .populate('user', 'name username profilePicture')
    .sort('-timestamp');

  return res.json(posts);
});

export default router;
