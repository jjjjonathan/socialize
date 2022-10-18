import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import Comment from '../../../../models/Comment';
import connectMongo from '../../../../utils/connectMongo';

const router = nc<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  await connectMongo();

  const postId = req.query.postId as string | undefined;

  const comments = await Comment.find({ post: postId }, '-post').populate(
    'user',
    'name username profilePicture',
  );

  return res.json(comments);
});

export default router;
