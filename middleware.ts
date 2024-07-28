import { NextRequest, NextResponse } from 'next/server';
import { getJWTPayload, verifyToken } from './lib/auth';

const redirect = (request: NextRequest) => {
  return NextResponse.redirect(new URL('/', request.url));
};

export async function middleware(request: NextRequest) {
  const payload = await getJWTPayload(request);

  if (!payload) {
    return redirect(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/user/:path*'],
};
