import passport from 'passport';

import User from '../models/User';
import local from './strategies/local';

// Serialize/deserialize with user ID

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(local);

export default passport;
