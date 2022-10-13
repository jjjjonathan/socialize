import { withAuth } from 'next-auth/middleware';
// import { authPages } from './pages/api/auth/[...nextauth]';

export const authPages = {
  signIn: '/login',
  signOut: '/auth/signout',
  error: '/auth/error', // Error code passed in query string as ?error=
  verifyRequest: '/auth/verify-request', // (used for check email message)
  newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
};

export default withAuth({
  pages: authPages,
});

// export { default } from 'next-auth/middleware';
