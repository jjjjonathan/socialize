import nc from 'next-connect';
import morgan from 'morgan';

import mongo from './mongo';
import passport from './passport';
import session from './session';

const middleware = nc();

middleware.use(morgan('dev'));

middleware.use(mongo);
middleware.use(session);
middleware.use(passport.initialize());
middleware.use(passport.session());

export default middleware;
