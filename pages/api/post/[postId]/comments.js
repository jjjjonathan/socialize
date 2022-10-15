import nc from 'next-connect';
import { unstable_getServerSession } from 'next-auth/next';
import Comment from '../../../../models/Comment';
import { authOptions } from '../../auth/[...nextauth]';
import connectMongo from '../../../../utils/connectMongo';

const handler = nc().get(async (req, res) => {
  await connectMongo();

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();

  const { postId } = req.query;

  const comments = await Comment.find({ post: postId }, '-post').populate(
    'user',
    'name username profilePicture',
  );
  return res.json(comments);
});

export default handler;
