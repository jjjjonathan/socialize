import nc from 'next-connect';
import middleware from '../../../../middleware';
import passport from '../../../../middleware/passport';

const handler = nc();
handler.use(middleware);

handler.get(
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.json({ msg: 'yeet' });
  },
);

export default handler;
