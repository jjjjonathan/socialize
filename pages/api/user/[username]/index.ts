import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../../models/User';

const router = nc<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  const { username } = req.query;

  const user = await User.findOne({ username }, '-friendRequests');

  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json(user);
});

export default router;
