import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import Token from '../../../models/Token';
import User from '../../../models/User';
import connectMongo from '../../../utils/connectMongo';

const router = nc<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  await connectMongo();

  const { token } = req.query;

  const tokenObject = await Token.findOne({ token });

  if (!tokenObject || tokenObject.type !== 'verifyEmail')
    return res.status(400).end();

  const createdTime = +tokenObject.timestamp;
  const expiryTime = createdTime + 1000 * 60 * 20;
  const currentTime = Date.now();

  if (expiryTime - currentTime < 0) {
    return res.status(401).json({ error: 'Token expired' });
  }

  const user = await User.findById(tokenObject.user);

  if (!user) return res.status(400).end();

  user.isEmailVerified = true;
  await user.save();

  await Token.deleteOne({ token });

  return res.status(202).end();
});

export default router;
