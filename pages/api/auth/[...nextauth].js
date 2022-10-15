import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import FacebookProvider from 'next-auth/providers/facebook';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import connectMongo from '../../../utils/connectMongo';
import { authPages } from '../../../middleware';

export const authOptions = {
  pages: authPages,
  callbacks: {
    async jwt({ token, user }) {
      const newToken = { ...token };

      if (user) {
        newToken.id = user._id;
        newToken.username = user.username;
        newToken.isEmailVerified = user.isEmailVerified;
        newToken.profilePicture = user.profilePicture;
      }

      return newToken;
    },
    async session({ session, token }) {
      const newSession = { ...session };

      newSession.user.id = token.id;
      newSession.user.username = token.username;
      newSession.user.isEmailVerified = token.isEmailVerified;
      newSession.user.profilePicture = token.profilePicture;
      delete newSession.user.image;

      return newSession;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Username and Password',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Enter username',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      authorize: async ({ username, password }) => {
        await connectMongo();

        const user = await User.findOne({ username });
        console.log('email', user?.email);
        if (!user) return null;

        const match = await bcrypt.compare(password, user.passwordHash);
        console.log('match', match);
        if (!match) return null;

        return user;
      },
    }),

    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_APP_ID,
    //   clientSecret: process.env.FACEBOOK_APP_SECRET,
    // }),
  ],
  debug: false,
};

export default NextAuth(authOptions);

/*

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

*/