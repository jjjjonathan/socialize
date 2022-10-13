import nc from 'next-connect';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';
import User from '../../../models/User';
import connectMongo from '../../../utils/connectMongo';

const handler = nc().get(async (req, res) => {
  await connectMongo();

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();

  const { id } = session.user;
  const currentUser = await User.findById(id).populate('requestedFriends');

  const users = await User.find(
    {},
    'name username userSince profilePicture',
  ).sort('-userSince');

  // return all users that are not the current user, their friends, friend requests, or requested friends

  const filteredUsers = users.filter((user) => {
    let include = true;
    if (user.id.toString() === currentUser.id.toString()) {
      include = false;
    } else {
      currentUser.friends.forEach((friend) => {
        if (user.id.toString() === friend.user.toString()) include = false;
      });
      currentUser.friendRequests.forEach((friendReq) => {
        if (user.id.toString() === friendReq.user.toString()) include = false;
      });
      currentUser.requestedFriends.forEach((reqFriend) => {
        if (user.id.toString() === reqFriend.id.toString()) include = false;
      });
    }
    return include;
  });

  return res.json(filteredUsers);
});

export default handler;
