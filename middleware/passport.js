import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';

import User from '../models/User';

// Serialize/deserialize with user ID

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        // user not found
        return done(null, false, { message: 'Incorrect username or password' });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user);
        } else {
          // passwords do not match!
          return done(null, false, {
            message: 'Incorrect username or password',
          });
        }
      });
      return done(null, user);
    });
  }),
);

export default passport;
