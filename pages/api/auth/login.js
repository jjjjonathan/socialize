import nc from 'next-connect';
import middleware from '../../../middleware';
import passport from '../../../middleware/passport';

const handler = nc();

handler.use(middleware);

handler.use(passport.authenticate('local'));
handler.post((req, res) => {
  res.json(req.user);
});

export default handler;
