import nc from 'next-connect';
import middleware from '../../../../middleware';
import Post from '../../../../models/Post';

const handler = nc();
handler.use(middleware);

handler.get(async (req, res) => {
  if (!req.user) return res.status(401).end();

  const { postId } = req.query;
  const post = await Post.findById(postId).populate(
    'likes',
    'name username profilePicture',
  );

  return res.json(post);
});

export default handler;
