import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });

    const isAuth = !!token;
    const emptyWorkspace =
      (token?.user as { workspaces?: any[] })?.workspaces?.length === 0;
    const isEmptyWorkspacePage = req.nextUrl.pathname === '/workspace';
    const isRestrictedPage =
      req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/register') ||
      req.nextUrl.pathname === '/';

    if (isAuth && emptyWorkspace) {
      if (req.nextUrl.pathname.startsWith('/dashboard') || isRestrictedPage) {
        return NextResponse.redirect(new URL('/workspace', req.url));
      }

      return null;
    }

    if (isAuth && !emptyWorkspace && isEmptyWorkspacePage) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (isRestrictedPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
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
