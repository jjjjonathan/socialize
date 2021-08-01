import nc from 'next-connect';
import middleware from '../../../../middleware';

const handler = nc();
handler.use(middleware);

handler.post(async (req, res) => {
  if (!req.user) return res.status(401).end();

  const { postId } = req.query;

  return res.json({ postId });
});

export default handler;
