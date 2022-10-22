import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import connectMongo from '../../../utils/connectMongo';
import { authOptions } from '../auth/[...nextauth]';
import User from '../../../models/User';

const router = nc<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  await connectMongo();

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();

  const { id } = session.user;
  const user = await User.findById(id, 'friendRequests').populate(
    'friendRequests.user',
    'name username profilePicture',
  );

  return res.json(user);
});

export default router;
