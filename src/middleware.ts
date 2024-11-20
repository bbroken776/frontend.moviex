import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('moviex.session')?.value
  const loginUrl = new URL('/auth/login', request.url)
  const homeUrl = new URL('/', request.url)

  const authPaths = ['/auth/login', '/auth/register']
  const isAuthPath = authPaths.some(path => request.nextUrl.pathname.startsWith(path))

  const protectedPaths = ['/profile', '/affiliate', '/admin']
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

  if (token && isAuthPath) return NextResponse.redirect(homeUrl)
  if (!token && isProtectedPath) return NextResponse.redirect(loginUrl)

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/auth/login',
    '/auth/register',
    '/admin/:path*',
  ],
}
