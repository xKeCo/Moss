import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const token: any = await getToken({ req });

    const isAuth = !!token;
    const emptyWorkspace =
      (token?.user as { workspaces?: any[] })?.workspaces?.length === 0;
    const isEmptyWorkspacePage = req.nextUrl.pathname === '/workspace';
    const isRestrictedPage =
      req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/register') ||
      req.nextUrl.pathname === '/';

    if (!isAuth) {
      if (!isRestrictedPage) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      return null;
    }

    if (isAuth && emptyWorkspace) {
      if (req.nextUrl.pathname.startsWith('/dashboard') || isRestrictedPage) {
        return NextResponse.redirect(new URL('/workspace', req.url));
      }

      return null;
    }

    if (isAuth && !emptyWorkspace && isEmptyWorkspacePage) {
      return NextResponse.redirect(
        new URL(`/dashboard/${token.user?.workspaces[0]?.id}`, req.url)
      );
    }

    if (isRestrictedPage || req.nextUrl.pathname === '/dashboard') {
      if (isAuth) {
        return NextResponse.redirect(
          new URL(`/dashboard/${token.user?.workspaces[0]?.id}`, req.url)
        );
      }

      return null;
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/', '/dashboard/:path*', '/workspace', '/login', '/register'],
};
