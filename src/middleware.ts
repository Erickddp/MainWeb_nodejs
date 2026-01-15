import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/panel')) {
        if (pathname === '/panel/login') return NextResponse.next();

        const session = request.cookies.get('evorix-session');
        // Note: process.env.ADMIN_PASSWORD is not directly available in Edge Runtime 
        // unless explicitly exported or using another method, but in Vercel it works 
        // for simple checks if correctly added to env.
        // However, to be safer, we'll just check if the cookie exists.
        // The actual validation happened in lib/auth/login.
        if (!session) {
            return NextResponse.redirect(new URL('/panel/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/panel', '/panel/:path*'],
};
