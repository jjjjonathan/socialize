import { withAuth } from 'next-auth/middleware';

export const authPages = {
  signIn: '/login',
};

export default withAuth({
  pages: authPages,
});

export const config = {
  matcher: [
    // Matches all paths (including API paths) except those starting with the following
    '/((?!signup|privacy-policy|verify-email|api/verify-email|api/user|change-password).*)',
  ],
};
