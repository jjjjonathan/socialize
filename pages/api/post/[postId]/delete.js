import nc from 'next-connect';
import { unstable_getServerSession } from 'next-auth/next';
import Post from '../../../../models/Post';
import Comment from '../../../../models/Comment';
import { authOptions } from '../../auth/[...nextauth]';
import connectMongo from '../../../../utils/connectMongo';

const handler = nc().delete(async (req, res) => {
  await connectMongo();

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();

  const { postId } = req.query;

  await Post.findByIdAndDelete(postId);
  await Comment.deleteMany({ post: postId });

  return res.status(204).end();
});

export default handler;
