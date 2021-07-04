import nc from 'next-connect';
import middleware from '../../../../middleware';
import passport from '../../../../middleware/passport';

const handler = nc();
handler.use(middleware);

handler.get(
  passport.authenticate('facebook', {
    authType: 'reauthenticate',
    scope: ['email'],
  }),
);

export default handler;
