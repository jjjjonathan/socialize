/* eslint-disable no-unused-vars */
import NextAuth from 'next-auth';
import { SessionUser } from './misc';

declare module 'next-auth' {
  interface Session {
    user: SessionUser;
  }

  interface User extends SessionUser {}
}
