import nc from 'next-connect';
import middleware from '../../../../../middleware';
import User from '../../../../../models/User';

const handler = nc();
handler.use(middleware);

handler.post(async (req, res) => {
  if (!req.user) return res.status(401).end();

  const { friendId } = req.query;
  const { id } = req.user;
  const user = await User.findById(id);

  const friendReqIndex = user.friendRequests.findIndex(
    (friendReq) => friendReq.user.toString() === friendId,
  );

  console.log('friend index: ', friendReqIndex);

  if (friendReqIndex === -1) return res.status(400).end();

  user.friendRequests.splice(friendReqIndex, 1);

  // Creating timestamp here so they're the same
  const timestamp = Date.now();

  user.friends.push({ user: friendId, timestamp });

  const friend = await User.findById(friendId);
  friend.friends.push({ user: id, timestamp });

  await user.save();
  await friend.save();

  return res.status(204).end();
});

export default handler;
