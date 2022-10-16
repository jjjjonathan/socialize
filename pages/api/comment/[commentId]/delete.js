import nc from 'next-connect';
import connectMongo from '../../../../utils/connectMongo';
import Comment from '../../../../models/Comment';

const handler = nc().delete(async (req, res) => {
  const { commentId } = req.query;
  await connectMongo();
  await Comment.findByIdAndDelete(commentId);
  return res.status(204).end();
});

export default handler;
