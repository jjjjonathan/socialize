import nc from 'next-connect';
import User from '../../../models/User';
import connectMongo from '../../../utils/connectMongo';

const handler = nc().get(async (req, res) => {
  await connectMongo();

  const users = await User.find(
    {},
    'name username userSince profilePicture',
  ).sort('-userSince');
  return res.json(users);
});

export default handler;
