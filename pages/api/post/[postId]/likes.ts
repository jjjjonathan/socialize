import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../../utils/connectMongo';
import Post from '../../../../models/Post';

const router = nc<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  await connectMongo();

  const { postId } = req.query;
  const post = await Post.findById(postId).populate(
    'likes',
    'name username profilePicture',
  );

  if (!post) return res.status(404).end();

  return res.json(post.likes);
});

export default router;
