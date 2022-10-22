import nc from 'next-connect';
import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import Post from '../../../../models/Post';
import { authOptions } from '../../auth/[...nextauth]';
import connectMongo from '../../../../utils/connectMongo';

const router = nc<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  await connectMongo();

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();

  const { postId } = req.query;
  const userId = session.user.id;

  const post = await Post.findById(postId);
  if (!post) return res.status(400).end();

  const likeIndex = post.likes.findIndex(
    (like) => like.toString() === userId.toString(),
  );

  if (likeIndex !== -1) {
    post.likes.splice(likeIndex, 1);
  } else {
    // @ts-ignore
    post.likes.push(userId);
  }

  await post.save();

  return res.json(post);
});

export default router;
