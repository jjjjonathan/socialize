import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import User from '../../../../../models/User';
import { authOptions } from '../../../auth/[...nextauth]';
import connectMongo from '../../../../../utils/connectMongo';

const router = nc<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  await connectMongo();

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();

  const friendId = req.query.friendId as string | undefined;
  const { id } = session.user;
  const user = await User.findById(id);

  if (!user || !friendId) return res.status(400).end();

  const friendReqIndex = user.friendRequests.findIndex(
    (friendReq) => friendReq.user.toString() === friendId,
  );

  if (friendReqIndex === -1) return res.status(400).end();

  user.friendRequests.splice(friendReqIndex, 1);

  // Creating timestamp here so they're the same
  const timestamp = new Date();

  // @ts-ignore
  user.friends.push({ user: friendId, timestamp });

  const friend = await User.findById(friendId);
  if (!friend) return res.status(400).end();

  // @ts-ignore
  friend.friends.push({ user: id, timestamp });

  await user.save();
  await friend.save();

  return res.status(204).end();
});

export default router;
