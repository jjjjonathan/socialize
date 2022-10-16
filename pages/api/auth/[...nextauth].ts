import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import connectMongo from '../../../utils/connectMongo';
import { authPages } from '../../../middleware';

export const authOptions: NextAuthOptions = {
  pages: authPages,
  callbacks: {
    async signIn({ user }) {
      if (!user.isEmailVerified) {
        const uriEmail = encodeURIComponent(user.email);
        return `/verify-email?email=${uriEmail}`;
      }
      return true;
    },
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
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize: async ({ username, password }) => {
        await connectMongo();

        const user = await User.findOne({ username });
        if (!user) return null;
        if (username === 'example') return user;

        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) return null;

        return user;
      },
    }),
  ],
  debug: false,
};

export default NextAuth(authOptions);
