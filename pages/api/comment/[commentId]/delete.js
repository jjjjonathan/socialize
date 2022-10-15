import nc from 'next-connect';
import { unstable_getServerSession } from 'next-auth/next';
import Comment from '../../../../models/Comment';
import { authOptions } from '../../auth/[...nextauth]';
import connectMongo from '../../../../utils/connectMongo';

const handler = nc().get(async (req, res) => {
  await connectMongo();

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();

  const { commentId } = req.query;

  await Comment.findByIdAndDelete(commentId);

  return res.status(204).end();
});

export default handler;
