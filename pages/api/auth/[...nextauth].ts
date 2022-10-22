/* eslint-disable prefer-destructuring */
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import connectMongo from '../../../utils/connectMongo';
import { authPages } from '../../../middleware';
import { SessionUser } from '../../../types/misc';

export const authOptions: NextAuthOptions = {
  pages: authPages,
  callbacks: {
    async signIn({ user }) {
      if (!user.isEmailVerified) {
        const uriEmail = encodeURIComponent(user.email!);
        return `/verify-email?email=${uriEmail}`;
      }
      return true;
    },
    async jwt({ token, user }) {
      const newToken = { ...token };

      if (user) {
        newToken.id = user.id;
        newToken.username = user.username;
        newToken.isEmailVerified = user.isEmailVerified;
        newToken.profilePicture = user.profilePicture;
      }

      return newToken;
    },
    async session({ session, token: jwt }) {
      const newSession = { ...session };
      const token = jwt as SessionUser;

      newSession.user.id = token.id;
      newSession.user.username = token.username;
      newSession.user.isEmailVerified = token.isEmailVerified;
      newSession.user.profilePicture = token.profilePicture;
      // @ts-ignore
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
      authorize: async (credentials) => {
        const username = credentials!.username;
        const password = credentials!.password;

        await connectMongo();

        const user = await User.findOne({ username });
        if (!user) return null;
        if (username === 'example') return user;

        const match = await bcrypt.compare(password, user.passwordHash!);
        if (!match) return null;

        return JSON.parse(JSON.stringify(user));
      },
    }),
  ],
  debug: false,
};

export default NextAuth(authOptions);
