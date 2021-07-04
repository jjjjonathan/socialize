import nc from 'next-connect';
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from 'morgan';

import mongo from './mongo';
import passport from './passport';
import session from './session';

// eslint-disable-next-line no-unused-vars
function onError(err, req, res, _next) {
  console.log('------ Middleware caught error: ------');
  console.log(err);
  console.log('--------------------------------------');

  res.status(500).end(err.toString());
  // OR: you may want to continue
  // next();
}

const router = nc({ onError });

router.use(morgan('dev'));

router.use(mongo);
router.use(session);
router.use(passport.initialize());
router.use(passport.session());

export default router;
