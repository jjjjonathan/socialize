import nc from 'next-connect';
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from 'morgan';

import mongo from './mongo';
import passport from './passport';
import session from './session';

// eslint-disable-next-line no-unused-vars
function onError(err, req, res, _next) {
  console.log('\n\n------ Middleware caught error: ------\n');
  console.log(err);
  console.log('\n--------------------------------------\n\n');

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
