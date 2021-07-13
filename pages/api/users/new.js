import nc from 'next-connect';
import middleware from '../../../middleware';
import User from '../../../models/User';

const handler = nc();
handler.use(middleware);

handler.get(async (req, res) => {
  if (!req.user) return res.status(401).end();

  const users = await User.find(
    {},
    'name username userSince profilePicture',
  ).sort('-userSince');

  // return all users that are not the current user, their friends or friend requests

  const filteredUsers = users.filter((user) => {
    let include = true;
    if (user.id.toString() === req.user._id.toString()) {
      include = false;
    } else {
      req.user.friends.forEach((friend) => {
        if (user.id.toString() === friend.user.toString()) include = false;
      });
      req.user.friendRequests.forEach((friendReq) => {
        if (user.id.toString() === friendReq.user.toString()) include = false;
      });
    }
    return include;
  });

  return res.json(filteredUsers);
});

export default handler;
