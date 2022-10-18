/* eslint-disable no-unused-vars */
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      isEmailVerified: string;
      profilePicture: string;
    };
  }
}
