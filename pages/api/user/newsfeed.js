import nc from 'next-connect';
import middleware from '../../../middleware';
import User from '../../../models/User';
import Post from '../../../models/Post';

const handler = nc();
handler.use(middleware);

handler.get(async (req, res) => {
  if (!req.user) return res.status(401).end();

  const { id } = req.user;
  const { friends } = await User.findById(id, 'friends');
  const friendIds = friends.map((friend) => friend.user);
  const allIds = [...friendIds, id];

  const posts = await Post.find({
    user: {
      $in: allIds,
    },
  })
    .populate('user', 'name username profilePicture')
    .sort('-timestamp');

  return res.json(posts);
});

export default handler;
