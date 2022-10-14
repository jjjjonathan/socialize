import nc from 'next-connect';
import User from '../../../models/User';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';
import connectMongo from '../../../utils/connectMongo';

const handler = nc().get(async (req, res) => {
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

export default handler;
