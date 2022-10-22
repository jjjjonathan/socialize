import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/User';
import connectMongo from '../../../utils/connectMongo';

const router = nc<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  await connectMongo();

  const users = await User.find(
    {},
    'name username userSince profilePicture',
  ).sort('-userSince');

  return res.json(users);
});

export default router;
