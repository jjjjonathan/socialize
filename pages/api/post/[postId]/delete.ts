import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import Post from '../../../../models/Post';
import Comment from '../../../../models/Comment';
import connectMongo from '../../../../utils/connectMongo';

const router = nc<NextApiRequest, NextApiResponse>();

router.delete(async (req, res) => {
  await connectMongo();

  const { postId } = req.query;

  await Post.findByIdAndDelete(postId);
  await Comment.deleteMany({ post: postId });

  return res.status(204).end();
});

export default router;
