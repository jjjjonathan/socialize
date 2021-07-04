import handler from '../../../../middleware';
import passport from '../../../../middleware/passport';

handler.get(
  passport.authenticate('facebook', {
    authType: 'reauthenticate',
    scope: ['email'],
  }),
);

export default handler;
