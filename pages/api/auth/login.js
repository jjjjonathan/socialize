import handler from '../../../middleware';
import passport from '../../../middleware/passport';

handler.post(passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

export default handler;
