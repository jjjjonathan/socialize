import nc from 'next-connect';
import middleware from '../../../middleware';
import User from '../../../models/User';

const handler = nc();
handler.use(middleware);

handler.post(async (req, res) => {
  if (!req.user) return res.status(401).end();

  const { id } = req.user;
  const { bio } = req.body;

  await User.findByIdAndUpdate(id, { bio });

  return res.status(204).end();
});

export default handler;
