import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import Comment from '../../../../models/Comment';
import connectMongo from '../../../../utils/connectMongo';

const router = nc<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  await connectMongo();
  console.log('mongo connected');

  const postId = req.query.postId as string | undefined;
  console.log('post id', postId);

  const comments = await Comment.find({ post: postId }, '-post').populate(
    'user',
    'name username profilePicture',
  );

  console.log('comments', comments);
  return res.json(comments);
});

export default router;
