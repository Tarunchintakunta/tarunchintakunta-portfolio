import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('p');
  const url = request.nextUrl.clone();
  url.search = '';
  if (!slug) {
    url.pathname = '/work';
  } else if (!/^[a-z0-9-]+$/.test(slug)) {
    url.pathname = '/work/_invalid';
  } else {
    url.pathname = `/work/${slug}`;
  }
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ['/project', '/project.html'],
};
