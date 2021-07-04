import handler from '../../../../middleware';
import passport from '../../../../middleware/passport';

handler.get(
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    successRedirect: '/login/facebook',
  }),
);

export default handler;
