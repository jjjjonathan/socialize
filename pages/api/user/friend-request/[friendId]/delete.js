import nc from 'next-connect';
import middleware from '../../../../../middleware';
import User from '../../../../../models/User';

const handler = nc();
handler.use(middleware);

handler.delete(async (req, res) => {
  if (!req.user) return res.status(401).end();

  const { friendId } = req.query;
  const { id } = req.user;
  const user = await User.findById(id);

  const friendReqIndex = user.friendRequests.findIndex(
    (friendReq) => friendReq.user.toString() === friendId,
  );

  if (friendReqIndex === -1) return res.status(400).end();

  user.friendRequests.splice(friendReqIndex, 1);

  await user.save();
  return res.status(204).end();
});

export default handler;
