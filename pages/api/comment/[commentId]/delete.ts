import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../../utils/connectMongo';
import Comment from '../../../../models/Comment';

const router = nc<NextApiRequest, NextApiResponse>();

router.delete(async (req, res) => {
  const { commentId } = req.query;
  await connectMongo();
  await Comment.findByIdAndDelete(commentId);
  return res.status(204).end();
});

export default router;
