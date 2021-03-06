import nc from 'next-connect';
import middleware from '../../../../middleware';
import passport from '../../../../middleware/passport';

const handler = nc();
handler.use(middleware);

handler.get(
  passport.authenticate('facebook', {
    scope: ['email'],
  }),
);

export default handler;
