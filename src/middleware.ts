import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const token: any = await getToken({ req });

    const workspaceId = token?.user?.workspaces?.[0]?.key;

    const availableWorkspaces = token?.user?.workspaces?.map((workspace: any) => workspace.key);

    const isAuth = !!token;
    const emptyWorkspace = (token?.user?.workspaces?.length ?? 0) === 0;
    const maxWorkspaces = (token?.user?.workspaces?.length ?? 0) === 3;
    const isRestrictedPage = ['/login', '/register', '/'].includes(req.nextUrl.pathname);

    if (!isAuth && !isRestrictedPage) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (isAuth) {
      if (req.nextUrl.pathname === '/dashboard') {
        return NextResponse.redirect(new URL(`/dashboard/${workspaceId}`, req.url));
      }

      if (req.nextUrl.pathname === '/settings') {
        return NextResponse.redirect(new URL(`/settings/${workspaceId}/workspace`, req.url));
      }

      if ((emptyWorkspace && req.nextUrl.pathname.startsWith('/dashboard')) || isRestrictedPage) {
        return NextResponse.redirect(new URL('/workspace', req.url));
      }

      if (!emptyWorkspace && !availableWorkspaces?.includes(req.nextUrl.pathname.split('/')[2])) {
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return NextResponse.redirect(new URL(`/dashboard/${workspaceId}`, req.url));
        }

        if (req.nextUrl.pathname.startsWith('/settings')) {
          return NextResponse.redirect(new URL(`/settings/${workspaceId}/workspace`, req.url));
        }
      }

      if (req.nextUrl.pathname === '/workspace' && maxWorkspaces) {
        return NextResponse.redirect(new URL(`/dashboard/${workspaceId}`, req.url));
      }

      if (isRestrictedPage) {
        return NextResponse.redirect(new URL(`/dashboard/${workspaceId}`, req.url));
      }
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
  matcher: ['/', '/dashboard/:path*', '/settings/:path*', '/workspace', '/login', '/register'],
};
