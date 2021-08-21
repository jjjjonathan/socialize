import FacebookStrategy from 'passport-facebook';
import { v2 as cloudinary } from 'cloudinary';
import User from '../../models/User';
import { getFacebookProfilePicture } from '../../utils/profileDefaults';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const facebook = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.WEB_URI}/api/auth/facebook/callback`,
    profileFields: ['id', 'email', 'displayName'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ facebookId: profile.id });
      if (!existingUser) {
        // This FB user not in database, check if user exists with this email
        const unlinkedEmailUser = await User.findOne({
          email: profile.emails[0].value,
        });

        if (!unlinkedEmailUser) {
          // This email not in database, create new user
          const image = await cloudinary.uploader.upload(
            getFacebookProfilePicture(profile.id, accessToken),
            {
              width: 512,
              height: 512,
              crop: 'fill',
              gravity: 'faces',
            },
          );
          const profilePicture = image.public_id;

          const newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            facebookId: profile.id,
            profilePicture,
            isEmailVerified: true,
          });
          const savedNewUser = await newUser.save();
          return done(null, savedNewUser);
        }

        // This email is in database, link FB account
        const linkedEmailUser = await User.findByIdAndUpdate(
          unlinkedEmailUser._id,
          { facebookId: profile.id },
          { new: true },
        );
        return done(null, linkedEmailUser);
      }
      // FB user in database, return
      return done(null, existingUser);
    } catch (error) {
      return done(error);
    }
  },
);

export default facebook;
