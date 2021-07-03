import FacebookStrategy from 'passport-facebook';
import User from '../../models/User';

const facebook = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'picture'],
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    return cb(null, profile);

    // User.findOrCreate({ facebookId: profile.id }, (err, user) => {
    //   return cb(err, user);
    // });
  },
);

export default facebook;
