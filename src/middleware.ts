import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const token: any = await getToken({ req });

    const workspaceId = cookies().get('activeWorkspace')?.value;

    const isAuth = !!token;
    const emptyWorkspace = (token?.user as { workspaces?: any[] })?.workspaces?.length === 0;
    const maxWorkspaces = (token?.user as { workspaces?: any[] })?.workspaces?.length === 3;
    const isRestrictedPage =
      req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/register') ||
      req.nextUrl.pathname === '/';

    if (!isAuth && !isRestrictedPage) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (isAuth && req.nextUrl.pathname === '/dashboard') {
      return NextResponse.redirect(new URL(`/dashboard/${workspaceId}`, req.url));
    }

    if (isAuth && emptyWorkspace) {
      if (req.nextUrl.pathname.startsWith('/dashboard') || isRestrictedPage) {
        return NextResponse.redirect(new URL('/workspace', req.url));
      }

      return null;
    }

    if (isAuth && req.nextUrl.pathname === '/workspace' && maxWorkspaces) {
      return NextResponse.redirect(new URL(`/dashboard/${workspaceId}`, req.url));
    }

    if (isRestrictedPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL(`/dashboard/${workspaceId}`, req.url));
      }

      return null;
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/', '/dashboard/:path*', '/workspace', '/login', '/register'],
};
