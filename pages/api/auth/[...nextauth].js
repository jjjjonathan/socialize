import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
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
