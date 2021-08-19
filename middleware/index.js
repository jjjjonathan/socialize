import nc from 'next-connect';
import mongo from './mongo';
import passport from './passport';
import session from './session';

const router = nc();

router.use(mongo);

router.use(session);
router.use(passport.initialize());
router.use(passport.session());

export default router;
