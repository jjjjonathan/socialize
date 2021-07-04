import handler from '../../../middleware';

handler.post((req, res) => {
  req.logout();
  res.status(204).end();
});

export default handler;
