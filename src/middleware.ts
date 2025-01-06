import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import apiServer from '@services/apiServer';

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('moviex.session')?.value;
  const nextPath = request.nextUrl.pathname;

  const isAuthPath = ['/auth'].some((path) => nextPath.startsWith(path));
  const isProtectedPath = ['/me', '/admin'].some((path) => nextPath.startsWith(path));
  const isAdminPath = nextPath.startsWith('/admin');

  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (token && isAuthPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (token && isAdminPath) {
    const hasAdminAuthority = await hasAuthority(token);
    if (!hasAdminAuthority) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

async function hasAuthority(token: string): Promise<boolean> {
  try {
    const response = await apiServer.post('/auth/authority', { token });
    const { status } = response.data;

    return status === 200;
  } catch (error) {
    console.error('Error verifying admin authority:', error);
    return false;
  }
}

export const config = {
  matcher: ['/auth/:path*', '/me/:path*', '/admin/:path*'],
};