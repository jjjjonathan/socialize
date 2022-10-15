import { withAuth } from 'next-auth/middleware';

export const authPages = {
  signIn: '/login',
  // error: '/auth/error', // Error code passed in query string as ?error=
  // newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
};

export default withAuth({
  pages: authPages,
});

export const config = {
  matcher: [
    // Reject paths starting with
    // `signup`, `privacy-policy`, `verify-email`, `api/verify-email` or `api/user`
    // Includes api paths
    '/((?!signup|privacy-policy|verify-email|api/verify-email|api/user).*)',
  ],
};
