import nc from 'next-connect';
import morgan from 'morgan';

import mongo from './mongo';

const middleware = nc();

middleware.use(mongo);
middleware.use(morgan('dev'));

export default middleware;
