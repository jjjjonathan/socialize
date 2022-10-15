import { withAuth } from 'next-auth/middleware';

export const authPages = {
  signIn: '/login',
  // error: '/auth/error', // Error code passed in query string as ?error=
  // verifyRequest: '/auth/verify-request', // (used for check email message)
  // newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
};

export default withAuth({
  pages: authPages,
});