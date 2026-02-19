import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Obtenemos el token de las cookies
  const token = request.cookies.get('adminToken')?.value;
  const { pathname } = request.nextUrl;

  // 1. SI INTENTA ENTRAR AL PANEL SIN ESTAR LOGUEADO (y no está en la página de login)
  if (pathname.startsWith('/admin') && !pathname.includes('/login')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // 2. SI YA ESTÁ LOGUEADO E INTENTA IR AL LOGIN, LO REGRESAMOS AL PANEL
  if (pathname === '/admin/login' && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

// Configura en qué rutas se ejecutará este middleware
export const config = {
  matcher: ['/admin/:path*'],
};