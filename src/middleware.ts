import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value;
  const loginUrl = new URL('/', request.url);

  if (!token) return NextResponse.redirect(loginUrl);
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/affiliate/:path*', '/admin/:path*'],
};
