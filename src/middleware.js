import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = 
    path === '/login' || 
    path === '/register' || 
    path === '/forgot-password' ||
    path.startsWith('/reset-password/');

  // Get the access token and user type from cookies
  const accessToken = request.cookies.get('access_token')?.value;
  const userType = request.cookies.get('user_type')?.value;

  // If the path is public and user is logged in, redirect to appropriate dashboard
  if (isPublicPath && accessToken && userType) {
    return NextResponse.redirect(new URL(`/dashboard/${userType}`, request.url));
  }

  // If the path is protected and user is not logged in, redirect to login
  if (!isPublicPath && (!accessToken || !userType)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user tries to access a different dashboard than their type
  if (path.startsWith('/dashboard/') && userType) {
    const dashboardType = path.split('/')[2];
    if (dashboardType !== userType) {
      return NextResponse.redirect(new URL(`/dashboard/${userType}`, request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password/:path*'
  ]
}; 