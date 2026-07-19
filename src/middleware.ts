import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_IPS = (process.env.ADMIN_ALLOWED_IPS ?? '').split(',').map(ip => ip.trim()).filter(Boolean)

export function middleware(req: NextRequest) {
  // Use the LAST value in x-forwarded-for (set by the trusted edge/proxy)
  // to prevent spoofing via prepending values.
  const forwarded = req.headers.get('x-forwarded-for')
  const ip =
    forwarded ? forwarded.split(',').at(-1)!.trim() :
    req.headers.get('x-real-ip') ??
    '127.0.0.1'

  const isLocal = ip === '127.0.0.1' || ip === '::1'

  if (!isLocal && !ALLOWED_IPS.includes(ip)) {
    return new NextResponse(null, { status: 404 })
  }

  // Friendly alias for allowlisted admins only — outsiders 404 above,
  // so the alias reveals nothing about the real portal path.
  if (req.nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL('/s1-portal', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/s1-portal', '/s1-portal/:path*'],
}
