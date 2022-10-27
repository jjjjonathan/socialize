import nc from 'next-connect';
import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../../../models/User';
import { authOptions } from '../../../auth/[...nextauth]';
import connectMongo from '../../../../../utils/connectMongo';

const router = nc<NextApiRequest, NextApiResponse>();

router.delete(async (req, res) => {
  await connectMongo();

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();

  const { friendId } = req.query;
  const { id } = session.user;
  const user = await User.findById(id);

  if (!user) return res.status(401).end();

  const friendReqIndex = user.friendRequests.findIndex(
    (friendReq) => friendReq.user.toString() === friendId,
  );

  if (friendReqIndex === -1) return res.status(400).end();

  user.friendRequests.splice(friendReqIndex, 1);

  await user.save();
  return res.status(204).end();
});

export default router;
