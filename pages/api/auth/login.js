import nc from 'next-connect';
import middleware from '../../../middleware';
import passport from '../../../middleware/passport';

const handler = nc();
handler.use(middleware);

handler.post(passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

export default handler;
