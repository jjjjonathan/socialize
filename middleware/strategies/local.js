import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../../models/User';

const local = new LocalStrategy((username, password, done) => {
  User.findOne({ username }, async (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return done(null, false);
    return done(null, user);
  });
});

export default local;
