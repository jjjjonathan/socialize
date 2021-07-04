import nc from 'next-connect';
import middleware from '../../../middleware';

const handler = nc();
handler.use(middleware);

handler.post((req, res) => {
  req.logout();
  res.status(204).end();
});

export default handler;
