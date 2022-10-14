import nc from 'next-connect';
import User from '../../../../../models/User';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';
import connectMongo from '../../../utils/connectMongo';

const handler = nc().post(async (req, res) => {
  await connectMongo();

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();

  const { friendId } = req.query;
  const { id } = session.user;
  const user = await User.findById(id);

  const friendReqIndex = user.friendRequests.findIndex(
    (friendReq) => friendReq.user.toString() === friendId,
  );

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
