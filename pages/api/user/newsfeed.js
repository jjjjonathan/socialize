import nc from 'next-connect';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';
import User from '../../../models/User';
import Post from '../../../models/Post';
import connectMongo from '../../../utils/connectMongo';

const handler = nc().get(async (req, res) => {
  await connectMongo();

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();

  const { id } = session.user;
  const { friends } = await User.findById(id, 'friends');
  const friendIds = friends.map((friend) => friend.user);
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

export default handler;
