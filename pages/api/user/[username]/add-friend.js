import nc from 'next-connect';
import { unstable_getServerSession } from 'next-auth/next';
import User from '../../../../models/User';
import { authOptions } from '../../auth/[...nextauth]';
import connectMongo from '../../../../utils/connectMongo';

const handler = nc().post(async (req, res) => {
  await connectMongo();

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();

  const { username } = req.query;
  const userToAdd = await User.findOne({ username });

  if (!userToAdd || session.user.username === username)
    return res.status(400).end();

  userToAdd.friendRequests.push({ user: session.user.id });

  const response = await userToAdd.save();
  return res.json(response);
});

export default handler;
