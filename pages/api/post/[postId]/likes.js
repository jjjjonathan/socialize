import nc from 'next-connect';
import { unstable_getServerSession } from 'next-auth/next';
import Post from '../../../../models/Post';
import { authOptions } from '../../auth/[...nextauth]';
import connectMongo from '../../../../utils/connectMongo';

const handler = nc().get(async (req, res) => {
  await connectMongo();

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();

  const { postId } = req.query;
  const post = await Post.findById(postId).populate(
    'likes',
    'name username profilePicture',
  );

  return res.json(post.likes);
});

export default handler;
