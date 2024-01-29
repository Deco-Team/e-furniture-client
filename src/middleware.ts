import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = cookies().get('accessToken')

  if (token) {
    return NextResponse.redirect(request.nextUrl.origin)
  }
}

export const config = {
  matcher: '/login-register'
}
