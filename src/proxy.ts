import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET || 'mi_clave_secreta_super_segura_123';
const secret = new TextEncoder().encode(SECRET_KEY);


export default async function proxy(request: NextRequest) {
  const token = request.cookies.get('adminToken')?.value;
  const { pathname } = request.nextUrl;

  let isTokenValid = false;

  if (token) {
    try {
      await jwtVerify(token, secret);
      isTokenValid = true;
    } catch (error) {
      console.warn('Intento de acceso con token inválido o expirado');
      isTokenValid = false;
    }
  }

  if (pathname.startsWith('/admin') && !pathname.includes('/login')) {
    if (!isTokenValid) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      if (token) {
        response.cookies.delete('adminToken');
      }
      return response;
    }
  }

  if (pathname === '/admin/login' && isTokenValid) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};