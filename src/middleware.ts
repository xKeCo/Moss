import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const token: any = await getToken({ req });

    const workspaceId = cookies().get('activeWorkspace')?.value ?? token?.user?.workspaces[0]?.id;

    const availableWorkspaces = token?.user?.workspaces?.map((workspace: any) => {
      return workspace.id;
    });

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

    if (isAuth) {
      if (req.nextUrl.pathname === '/dashboard') {
        return NextResponse.redirect(new URL(`/dashboard/${workspaceId}`, req.url));
      }

      if (emptyWorkspace) {
        if (req.nextUrl.pathname.startsWith('/dashboard') || isRestrictedPage) {
          return NextResponse.redirect(new URL('/workspace', req.url));
        }

        return null;
      }

      if (
        !emptyWorkspace &&
        req.nextUrl.pathname.startsWith('/dashboard') &&
        !availableWorkspaces?.includes(req.nextUrl.pathname.split('/')[2])
      ) {
        return NextResponse.redirect(new URL(`/dashboard/${workspaceId}`, req.url));
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
  matcher: ['/', '/dashboard/:path*', '/workspace', '/login', '/register'],
};
